const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller");

router
.route("/")
.post(adminController.createAdmin);

router
.route("/login")
.post(adminController.loginAdmin);

router
.route("/logout")
.post(adminController.logoutAdmin)

module.exports = router