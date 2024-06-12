const mongoose = require("mongoose");

const userModel = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add name"]
        },
        email: {
            type: String,
            required: [true, "Please enter email address"],
            unique:[true, "Email address already exist"]
        },
        password: {
            type: String,
            required: [true, "Please enter password"]
        },
        mobile: {
            type: String,
            required: [true, "Please enter mobile number"]
        },

    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userModel)