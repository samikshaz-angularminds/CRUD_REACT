const Admin = require("../model/admin.model");
const asyncHandler = require("../utils/AsyncHandler.utils");
const ApiError = require("../utils/ApiError.utils");

const options = {
    httpOnly: true,
    secure: true
};

const createAdmin = asyncHandler(async (req, res) => {
    const requestBody = req.body;

    console.log("request body: ", requestBody);

    const adminExists = await Admin.findOne({ email: requestBody.email });

    if (adminExists) {
        throw new ApiError(400, "Admin with this email already exists");
    }

    const newAdmin = await Admin.create(requestBody);

    if (!newAdmin) {
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

const loginAdmin = asyncHandler(async (req, res) => {

    const requestBody = req.body;

    const admin = await Admin.findOne({ employee_id: requestBody.employee_id, password: requestBody.password });

    if (!admin) {
        throw new ApiError(404, "admin not found");
    }

    const token = admin.generateToken();

    console.log('====================================');
    console.log({ admin, token });
    console.log('====================================');

    return res
        .cookie("token",options)
        .json(
            { admin, token }
        );
});

const getAdmin = asyncHandler(async (req, res) => {
    const adminId = req.admin.id;

    const admin = await Admin.findById(adminId);


    if (!admin) {
        throw new ApiError(404, "Could not find the admin");
    }

    return res.json(admin);
});

const updateAdmin = asyncHandler(async (req, res) => {
    const { name, email, phoneNo, marital_status } = req.body;

    const adminId = req.admin.id;

    const updatedAdmin = await Admin.findByIdAndUpdate(
        adminId,
        {
            $set: {
                name: name,
                email: email,
                phoneNo: phoneNo,
                marital_status: marital_status,
            }
        },
        { new: true },
    );

    if (!updatedAdmin) {
        throw new ApiError(400, "Failed to update the information of admin");
    }

    return res
        .json(
            updatedAdmin
        );
});

const logoutAdmin = asyncHandler(async (req, res) => {
    return res
        .clearCookie("token", options)
});


module.exports = {
    createAdmin,
    loginAdmin,
    logoutAdmin,
    getAdmin,
    updateAdmin
};