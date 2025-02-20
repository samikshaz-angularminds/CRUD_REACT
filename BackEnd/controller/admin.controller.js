const Admin = require("../model/admin.model");
const asyncHandler = require("../utils/AsyncHandler.utils");
const ApiError = require("../utils/ApiError.utils");
const ApiResponse = require("../utils/ApiResponse.utils");

const options = {
    httpOnly: true,
    secure: true
};

const createAdmin = asyncHandler( async (req,res) => {
    const requestBody = req.body;

    console.log("request body: ", requestBody);

    const adminExists = await Admin.findOne({email: requestBody.email});

    if(adminExists){
        throw new ApiError(400, "Admin with this email already exists");
    }

    const newAdmin = await Admin.create(requestBody);

    if(!newAdmin){
        throw new ApiError(400, "There has been an issue while creating the user");
    }

    return res
    .json(
        new ApiResponse(
            200,
            newAdmin,
            "Admin created successfully"
        )
    );
    
});

const loginAdmin = asyncHandler( async (req,res) => {

    const requestBody = req.body;

    const admin = await Admin.findOne({employee_id: requestBody.employee_id});

    if(!admin){
        throw new ApiError(404, "admin not found");
    }

    const token = admin.generateToken();

    console.log('====================================');
    console.log({admin,token});
    console.log('====================================');

    return res
    .cookie("token")
    .json(
       {admin,token}
    );
});

const logoutAdmin = asyncHandler( async (req,res) => {
    return res
    .clearCookie("token",options)
});


module.exports = {
    createAdmin,
    loginAdmin,
    logoutAdmin
};