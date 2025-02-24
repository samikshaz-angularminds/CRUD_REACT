const Employee = require("../model/employee.model");
const Admin = require("../model/admin.model");
const asyncHandler = require("../utils/AsyncHandler.utils");
const ApiError = require("../utils/ApiError.utils");

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

    return res.json(newEmployee);

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
            updatedEmployee
        );
});

const deleteEmployee = asyncHandler(async (req, res) => {
    const employee_id = req.params.id;

    const deleteEmployee = await Employee.findByIdAndDelete(employee_id);

    if (!deleteEmployee) {
        throw new ApiError(400, "Failed to delete the employee");
    }

    return res.json("User has been deleted successfully");
});

const getEmployees = asyncHandler(async (req, res) => {
    // declaring requestQueryParams
    let requestQueryParams;

    // if req.query exists then requestQueryParams will be assigned a value
    if (req.query !== "") {
        requestQueryParams = req.query;
        console.log("request query is...", requestQueryParams);
    }

    const page = requestQueryParams.page || 1;
    let limit = requestQueryParams.limit || 10;
    const skip = (page - 1) * limit;
    const search = requestQueryParams.search;
    const filterDept = requestQueryParams.filterDept;
    const sortById = requestQueryParams.sortById;

    let mongoQuery = { admin: req.admin._id };

    if (filterDept) {
        mongoQuery.department = filterDept;
    }

    if (search) {
        mongoQuery.name = { $regex: `^${search}`, $options: "i" };
    }

    // let sortQuery = {};
    // if (sortById) {
    //     sortQuery.employee_id = { $expr: { $toInt: { $substr: ["employee_id", 2, -1] } } };
    // }

    let sortOrder = sortById === "asc" ? 1 : -1;

    // get all employees
    let employees;
    if (sortById) {
        employees = await Employee.find(mongoQuery);


        employees.sort((a, b) => {
            let numA = parseInt(a.employee_id.replace(/\D/g, ""), 10); // Extract number
            let numB = parseInt(b.employee_id.replace(/\D/g, ""), 10); // replace(/\D/g, "") removes non-numeric characters
            return (sortById === "asc" ? numA - numB : numB - numA); // Sort numerically
        });

        employees = employees.slice(skip, skip + limit);
    }
    else {
        employees = await Employee.find(mongoQuery).skip(skip).limit(limit);
    }

    // no employees
    if (!employees) {
        throw new ApiError(404, "Employees not found");
    }

    const totalEmployees = await Employee.countDocuments()
    const totalPages = Math.ceil(totalEmployees / limit);


    return res
        .json({ employees, page, limit, totalEmployees, totalPages });
});

const getEmployeeById = asyncHandler(async (req, res) => {
    const employee_id = req.params.id;

    const employee = await Employee.findById(employee_id);

    if (!employee) {
        throw new ApiError(404, "Employee not found");
    }

    return res.json(employee);
});

module.exports = {
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployees,
    getEmployeeById
}