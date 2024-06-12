const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const { uploadImage, getUploadImage } = require("../controllers/uploadImageController");
const upload = require('../middleware/uploads')

router.post("/upload-image", uploadImage);
router.get("/upload-image", getUploadImage )

module.exports = router;