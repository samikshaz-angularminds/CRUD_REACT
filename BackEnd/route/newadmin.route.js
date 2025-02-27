const express = require("express");
const router = express.Router();
const newAdminController = require("../controller/newadmin.controller");
const upload = require("../middleware/multer.middleware");
const verifyToken = require("../middleware/newauth.middleware");

router
    .route("/register")
    .post(upload.fields([
        { name: "resume", maxCount: 1 },
        { name: "profile_picture", maxCount: 1 }
    ]), newAdminController.createAdmin);

router
    .route("/login")
    .post(newAdminController.loginAdmin);

router
    .route("/")
    .get(verifyToken, newAdminController.getAdmin)
    .put(verifyToken, upload?.fields([
        { name: "resume", maxCount: 1 },
        { name: "profile_picture", maxCount: 1 }
    ]) || ((req,res,next) => next()), newAdminController.updateAdmin);


module.exports = router;