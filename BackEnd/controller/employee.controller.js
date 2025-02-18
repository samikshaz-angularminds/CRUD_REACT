const Employee = require("../model/employee.model");
const Admin = require("../model/admin.model");

const asyncHandler = require("../utils/AsyncHandler.utils");
const ApiError = require("../utils/ApiError.utils");
const ApiResponse = require("../utils/ApiResponse.utils");

const addEmployee = asyncHandler(async (req, res) => {
    const requestBody = req.body;

    const employeeExists = await Employee.findOne({
        $and: [{ employee_id: requestBody.employee_id }, { admin: req.admin._id }]
    });

    if (employeeExists) {
        throw new ApiError(400, "Employee with employee id already exists");
    }

    const adminExists = await Admin.findById(req.admin._id);

    if (!adminExists) {
        throw new ApiError(404, "Admin not found");
    }

    requestBody.admin = req.admin._id;

    const newEmployee = await Employee.create(requestBody);

    if (!newEmployee) {
        throw new ApiError(400, "Failed to create new employee");
    }

    return res
        .json(
            new ApiResponse(
                201,
                newEmployee,
                "New Employee created successfully"
            )
        );

});

const updateEmployee = asyncHandler(async (req, res) => {
    const { name, email, department, phoneNo, gender, marital_status, designation } = req.body;

    const employee_id = req.params.id;

    const updatedEmployee = await Employee.findByIdAndUpdate(
        employee_id,
        {
            $set: {
                name: name,
                email: email,
                department: department,
                phoneNo: phoneNo,
                gender: gender,
                marital_status: marital_status,
                designation: designation,
            }
        },
        { new: true },
    );


    if (!updatedEmployee) {
        throw new ApiError(400, "Failed to update the information of employee");
    }

    return res
        .json(
            new ApiResponse(
                200,
                updatedEmployee,
                "Employee information has been updated successfully"
            )
        );
});

const deleteEmployee = asyncHandler(async (req, res) => {
    const employee_id = req.query.employee_id;

    const deleteEmployee = await Employee.findByIdAndDelete(employee_id);

    if (!deleteEmployee) {
        throw new ApiError(400, "Failed to delete the employee");
    }

    return res
        .json(
            200,
            {},
            "User has been deleted successfully"
        );
});

const getEmployees = asyncHandler(async (req, res) => {

    const employees = await Employee.find({ admin: req.admin._id });

    if (!employees) {
        throw new ApiError(404, "Employees not found");
    }

    const page = 1;
    const limit = 10;
    const totalEmployees = await Employee.countDocuments()
    const totalPages = Math.ceil(totalEmployees/limit);

    return res
        .json(
            new ApiResponse(
                200,
                {employees,page,limit,totalEmployees,totalPages},
                "Employees"
            )
        );
});

const getEmployeeById = asyncHandler(async (req, res) => {
    const employee_id = req.params.id;

    const employee = await Employee.findById(employee_id);

    if (!employee) {
        throw new ApiError(404, "Employee not found");
    }

    return res
        .json(
            new ApiResponse(
                200,
                employee,
                "Employee found"
            )
        );
});

module.exports = {
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployees,
    getEmployeeById
}