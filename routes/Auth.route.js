const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/Auth.services.js");

router.post("/register", AuthController.Register);
router.post("/login", AuthController.Login);

module.exports = router;
