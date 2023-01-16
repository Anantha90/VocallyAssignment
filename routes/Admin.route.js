const express = require("express");
const router = express.Router();
const { Auth } = require("../middleware/Auth.js");
const AdminServices = require("../controllers/Admin.services.js");

router.get("/getAllStudents", Auth("Admin"), AdminServices.getAllStudents);
router.post("/addBook", Auth, AdminServices.addBook);
router.get("/getAllAdmin", Auth, AdminServices.getAllAdmin);

module.exports = router;
