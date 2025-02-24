const NewAdmin = require("../model/newAdmin.model");
const NewEmployee = require("../model/newEmployee.model");
const asyncHandler = require("../utils/AsyncHandler.utils");
const ApiError = require("../utils/ApiError.utils");
const cloudinary = require("../config/cloudinary.config");

const addNewEmployee = asyncHandler(async (req,res) => {
    let requestBody = request.body;
})