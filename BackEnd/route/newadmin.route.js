const express = require("express");
const router = express.Router();
const newAdminController = require("../controller/newadmin.controller");
const upload = require("../middleware/multer.middleware");


router
.route("/register")
.post(upload.fields([
    {name : "resume", maxCount: 1},
    {name: "profile_picture", maxCount: 1}
]),newAdminController.createAdmin);

module.exports = router;