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


    // get all employees
    let employees = await Employee.find({ admin: req.admin._id }).skip(skip).limit(limit);

    // no employees
    if (!employees) {
        throw new ApiError(404, "Employees not found");
    }

    const search = requestQueryParams.search;
    const filterDept = requestQueryParams.filterDept;
    const totalEmployees = await Employee.countDocuments()
    const totalPages = Math.ceil(totalEmployees / limit);



    // filter by department
    if (filterDept) {
        console.log("employees before filtering: ", filterDept);

        employees = employees.filter((employee) => employee.department === filterDept.toString());
        console.log("employees after filtering: ", employees);

        return res
            .json({ employees, page, limit, totalEmployees, totalPages });
    }

    if (search) {
        employees = employees.filter((employee) => employee.name.toLowerCase().includes(search.toLowerCase()))
        return res
            .json({ employees, page, limit, totalEmployees, totalPages });
    }


    if (requestQueryParams.limit) {
        limit = requestQueryParams.limit;
        employees = await Employee.find().skip(skip).limit(parseInt(limit));
        console.log("employees in limit: ",employees);
        
        return res
            .json({employees, page, limit, totalEmployees, totalPages});
    }

   
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