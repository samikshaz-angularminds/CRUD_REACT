const NewEmployee = require("../model/newEmployee.model");
const asyncHandler = require("../utils/AsyncHandler.utils");
const ApiError = require("../utils/ApiError.utils");
const NewAdmin = require("../model/newAdmin.model");
const cloudinary = require("../config/cloudinary.config");

const addEmployee = asyncHandler(async (req, res) => {
    const requestBody = req.body;
    const requestFiles = req.files;

    console.log('====================================');
    console.log(requestBody);
    console.log('====================================');

    console.log('====================================');
    console.log(requestFiles);
    console.log('====================================');

    const employeeExists = await NewEmployee.findOne({
        $and: [{ employee_id: requestBody.employee_id }, { admin: req.new_admin._id }]
    });

    if (employeeExists) {
        throw new ApiError(400, "Employee with employee id already exists");
    }

    const adminExists = await NewAdmin.findById(req.new_admin._id);

    if (!adminExists) {
        throw new ApiError(404, "Admin not found");
    }

    const resumeUpload = await cloudinary.uploader.upload(requestFiles?.resume[0].path, ({
        resource_type: "raw",
        folder: "Resume"
    }));

    const profile_picture_Upload = await cloudinary.uploader.upload(requestFiles?.profile_picture[0].path, ({
        resource_type: "image",
        folder: "Crud_ProfilePic"
    }));

    const resumeUrl = resumeUpload.url;

    const profile_picture_here = {
        public_id: profile_picture_Upload.public_id,
        url: profile_picture_Upload.url
    };

    requestBody.admin = req.new_admin._id;
    requestBody.resume = resumeUrl;
    requestBody.profile_picture = profile_picture_here;

    const newEmployee = await NewEmployee.create(requestBody);



    if (!newEmployee) {
        throw new ApiError(400, "Failed to create new employee");
    }

    return res.json(newEmployee);

});

const updateEmployee = asyncHandler(async (req, res) => {
    const { name, email, linkedIn, workShift, department, phoneNo, gender } = req.body;
    const requestFiles = req?.files;

    const employee_id = req.params.id;
    let resumeUpload;
    let profile_picture_Upload;
    let resumeUrl;
    let profile_picture_here;

    const existingEmployee = await NewEmployee.findById(employee_id);

    console.log({ name, email, linkedIn, workShift, department, phoneNo, gender });
    

    resumeUrl = existingEmployee?.resume;
    profile_picture_here = existingEmployee?.profile_picture;
    name = existingEmployee?.name; 
    email = existingEmployee?.email; 
    linkedIn = existingEmployee?.linkedIn; 
    workShift = existingEmployee?.workShift; 
    department = existingEmployee?.department; 
    phoneNo = existingEmployee?.phoneNo; 
    gender = existingEmployee?.gender;


    if (requestFiles?.resume) {
        resumeUpload = await cloudinary.uploader.upload(requestFiles?.resume[0].path, ({
            resource_type: "raw",
            folder: "Resume"
        }));
        resumeUrl = resumeUpload?.url;
    }

    if (requestFiles?.profile_picture) {
        profile_picture_Upload = await cloudinary.uploader.upload(requestFiles.profile_picture[0].path, ({
            resource_type: "image",
            folder: "Crud_ProfilePic"
        }));
        profile_picture_here = {
            public_id: profile_picture_Upload?.public_id,
            url: profile_picture_Upload?.url
        };
    }

    const updatedEmployee = await NewEmployee.findByIdAndUpdate(
        employee_id,
        {
            $set: {
                name: name,
                email: email,
                department: department,
                phoneNo: phoneNo,
                gender: gender,
                linkedIn: linkedIn,
                workShift: workShift,
                resume: resumeUrl,
                profile_picture: profile_picture_here
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

    const deleteEmployee = await NewEmployee.findByIdAndDelete(employee_id);

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
        // console.log("request query is...", requestQueryParams);
    }

    const page = requestQueryParams?.page || 1;
    let limit = requestQueryParams?.limit || 10;
    const skip = (page - 1) * limit;
    const search = requestQueryParams?.search;
    const filterDept = requestQueryParams?.filterDept;
    const sortById = requestQueryParams?.sortById;

    let mongoQuery = { admin: req.new_admin._id };

    // console.log("limit here: ",limit);
    
    if (filterDept) {
        mongoQuery.department = filterDept;
    }

    if (search) {
        mongoQuery.name = { $regex: `^${search}`, $options: "i" };
    }


    // get all employees
    let employees;
    if (sortById) {
        employees = await NewEmployee.find(mongoQuery);


        employees.sort((a, b) => {
            let numA = parseInt(a.employee_id.replace(/\D/g, ""), 10); // Extract number
            let numB = parseInt(b.employee_id.replace(/\D/g, ""), 10); // replace(/\D/g, "") removes non-numeric characters
            return (sortById === "asc" ? numA - numB : numB - numA); // Sort numerically
        });

        employees = employees.slice(skip, skip + limit);
    }
    else {
        employees = await NewEmployee.find(mongoQuery).skip(skip).limit(limit);
    }

    // no employees
    if (!employees) {
        throw new ApiError(404, "Employees not found");
    }

    const totalEmployees = await NewEmployee.countDocuments()
    const totalPages = Math.ceil(totalEmployees / limit);


    return res
        .json({ employees, page, limit, totalEmployees, totalPages });
});

const getEmployeeById = asyncHandler(async (req, res) => {
    const employee_id = req.params.id;

    const employee = await NewEmployee.findById(employee_id);

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