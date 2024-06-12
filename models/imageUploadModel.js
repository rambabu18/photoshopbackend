const mongoose = require("mongoose");

const imageUploadModel = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please add title"]
        },
        image: {
            type: String,
        },
        username: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("imageUpload", imageUploadModel)