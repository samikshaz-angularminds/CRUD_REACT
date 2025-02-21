const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller");
const verifyToken = require("../middleware/auth.middleware");

router
.route("/")
.post(adminController.createAdmin);

router
.route("/login")
.post(adminController.loginAdmin);

router
.route("/my-profile")
.get(verifyToken,adminController.getAdmin);

router
.route("/update-profile")
.put(verifyToken,adminController.updateAdmin);

router
.route("/logout")
.post(adminController.logoutAdmin)

module.exports = router