const express = require("express");
const router = express.Router();
const newEmployeeController = require("../controller/newemployee.controller");
const verifyToken = require("../middleware/newauth.middleware");
const upload = require("../middleware/multer.middleware");

router
    .route("/getAllEmployees")
    .get(verifyToken, newEmployeeController.getEmployees)

router
    .route("/")
    .post(verifyToken, upload.fields([
        { name: "resume", maxCount: 1 },
        { name: "profile_picture", maxCount: 1 }
    ]), newEmployeeController.addEmployee)

router
    .route("/:id")
    .get(verifyToken, newEmployeeController.getEmployeeById)
    .put(verifyToken, upload.fields([
        { name: "resume", maxCount: 1 },
        { name: "profile_picture", maxCount: 1 }
    ]), newEmployeeController.updateEmployee)
    .delete(verifyToken, newEmployeeController.deleteEmployee)


module.exports = router