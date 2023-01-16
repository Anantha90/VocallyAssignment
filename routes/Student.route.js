const express = require("express");
const router = express.Router();
const { Auth } = require("../middleware/Auth.js");
const StudentServices = require("../controllers/Student.services.js");

router.get("/getStudent", Auth("Student"), StudentServices.getStudent);
router.put("/issueBook/:BookID", Auth("Student"), StudentServices.issueBook);
router.put("/returnBook/:BookID", Auth("Student"), StudentServices.returnBook);

module.exports = router;
