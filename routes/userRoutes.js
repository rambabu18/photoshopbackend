const express = require("express");
const router = express.Router();
const { registerUser, loginUser, currentUser, currentUserList } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", currentUser);

router.get("/currentList", validateToken, currentUserList);


module.exports = router;