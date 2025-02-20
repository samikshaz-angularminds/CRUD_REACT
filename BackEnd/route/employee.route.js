const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employee.controller");
const verifyToken = require("../middleware/auth.middleware");

router
.route("/getAllEmployees")
.get(verifyToken, employeeController.getEmployees)

router
.route("/")
.post( verifyToken,employeeController.addEmployee)

router
.route("/:id")
.get( verifyToken,employeeController.getEmployeeById)
.put( verifyToken,employeeController.updateEmployee)
.delete( verifyToken,employeeController.deleteEmployee)


module.exports = router