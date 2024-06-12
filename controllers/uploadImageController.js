const asyncHandler = require("express-async-handler")
const multer = require('multer');
const ImageUploadModel = require("../models/imageUploadModel");

const uploadImage = asyncHandler(async (req, res) => {
    const {title, username, base64} = req.body;
    if(!title || !username){
        res.status(400);
        throw new Error("All fields are mandatory !")
    }
    // const employeeAvailable = await EmployeeModel.findOne({email,employeeId});
    // if(employeeAvailable){
    //     res.status(400);
    //     throw new Error("User already registered");
    // }
    const imageUploadModel = await ImageUploadModel.create({
         title: title, username:username, image: base64
        })

    imageUploadModel.save()
    .then(res=>{
        res.json({
            message: "Image Upload Successfully"
        })
    })
    .catch(err=>{
        res.json({
            message: "An error Occured"
        })
    })
});


const getUploadImage = asyncHandler(async (req, res) => {
    const imageUploadModel = await ImageUploadModel.find();
    res.status(200).json(imageUploadModel);
});

module.exports = {
    uploadImage,
    getUploadImage
}