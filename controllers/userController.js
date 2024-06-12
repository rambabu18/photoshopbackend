const asyncHandler = require("express-async-handler")
const UserModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//@desc New User Register
//route Post /api/users/register
//@access public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password, mobile} = req.body;
    console.log(req.body)
    if(!name || !email || !password || !mobile){
        res.status(400);
        throw new Error("All fields are mandatory !")
    }
    const userAvailable = await UserModel.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("Hashed Password:", hashedPassword);
    const registerUserModel = await UserModel.create({
        name, 
        mobile,
        email, 
        password:hashedPassword
    })

    if(registerUserModel){
        res.status(201).json({_id: registerUserModel.id, email:registerUserModel.email})
    }else{
        res.status(400);
        throw new Error("User data is not valid")
    }

    res.json({message: "User Created Succesfully"})
});

//@desc User Login
//route Post /api/user/login
//@access public
const loginUser = asyncHandler(async(req, res) => {
    
    const {email, password} = req.body;

    if( !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory !")
    }
    const user = await UserModel.findOne({email})
    // compare password with hashedpassword
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            {
                user:{
                    name: user.name,
                    email: user.email,
                    id: user.id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "15m"}
        )
        res.status(200).json({token:accessToken, user: user.name});
    }else{
        res.status(401);
        throw new Error("Email or Password is not valid")
    }
});

//@desc Current User 
//route Get /api/users/current
//@access private
const currentUser = asyncHandler(async(req, res) => {
    const userAvailable = await UserModel.find();
   
    const user = ()=>{
        if(userAvailable){
            return true;
        }else{
            false
        }
    }
     const users = user();
    res.status(200).json({user: users, currentUser: userAvailable })
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
}

//@desc Current User 
//route Get /api/users/currentList
//@access private
const currentUserList = asyncHandler(async(req, res) => {
    const userAvailable = await UserModel.find();
   
    res.status(200).json({user: userAvailable })
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
    currentUserList
}