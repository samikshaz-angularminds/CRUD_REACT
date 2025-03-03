const NewAdmin = require("../model/newAdmin.model");
const asyncHandler = require("../utils/AsyncHandler.utils");
const ApiError = require("../utils/ApiError.utils");
const cloudinary = require("../config/cloudinary.config");

const options = {
    httpOnly: true,
    secure: true
};

const createAdmin = asyncHandler(async (req, res) => {
    let requestBody = req.body; // getting body
    const requestFiles = req.files; //getting file

    console.log('====================================');
    console.log(requestBody);
    console.log('====================================');
    console.log('====================================');
    console.log(requestFiles);
    console.log('====================================');

    // handling errors
    if ((!requestBody.employee_id)) throw new ApiError(400, "Employee Id is required")
    if ((!requestBody.name)) throw new ApiError(400, "name is required")
    if ((!requestBody.email)) throw new ApiError(400, "email is required")
    if ((!requestBody.linkedIn)) throw new ApiError(400, "linkedIn is required")
    if ((!requestBody.phoneNo)) throw new ApiError(400, "phoneNo is required")
    if ((!requestBody.age)) throw new ApiError(400, "age is required")
    if ((!requestBody.password)) throw new ApiError(400, "password is required")
    if ((!requestBody.gender)) throw new ApiError(400, "gender is required")
    if ((!requestBody.experience)) throw new ApiError(400, "experience is required")
    if ((!requestBody.department)) throw new ApiError(400, "department is required")
    if ((!requestBody.date_of_joining)) throw new ApiError(400, "date_of_joining is required")
    if ((!requestBody.workShift)) throw new ApiError(400, "workShift is required")
    if ((!requestFiles?.resume)) throw new ApiError(400, "resume is required")
    if ((!requestFiles?.profile_picture)) throw new ApiError(400, "profile_picture is required")

    if (requestFiles.resume[0].mimetype !== "application/pdf") throw new ApiError(400, "Only pdf file is required")

    const resumeUpload = await cloudinary.uploader.upload(requestFiles.resume[0].path, ({
        resource_type: "raw",
        folder: "Resume"
    }));

    const profile_picture_Upload = await cloudinary.uploader.upload(requestFiles.profile_picture[0].path, ({
        resource_type: "image",
        folder: "Crud_ProfilePic"
    }));

    const resumeUrl = resumeUpload.url;

    const profile_picture = {
        public_id: profile_picture_Upload.public_id,
        url: profile_picture_Upload.url
    };

    requestBody.resume = resumeUrl;
    requestBody.profile_picture = profile_picture;

    const newAdmin = await NewAdmin.create(requestBody);

    return res.json(newAdmin);
});

const loginAdmin = asyncHandler(async (req, res) => {
    const requestBody = req.body;

    const newadmin = await NewAdmin.findOne({ employee_id: requestBody.employee_id, password: requestBody.password });

    if (!newadmin) {
        throw new ApiError(404, "Employee with employee_id not found");
    }

    const token = newadmin.generateToken();

    return res
        .cookie("loginToken", options)
        .json({ newadmin, token });
});


const getAdmin = asyncHandler(async (req,res) => {
    const adminId = req.new_admin._id;

    const admin = await NewAdmin.findById(adminId);

    if(!admin){
        throw new ApiError(404, "Could not find an admin");
    }

    return res.json(admin);
});

const updateAdmin = asyncHandler(async (req,res) => {
    const { name, email, linkedIn, workShift, department, phoneNo, gender } = req.body;
    const requestFiles = req?.files;

    const admin_id = req.new_admin.id;
    let resumeUpload;
    let profile_picture_Upload;
    let resumeUrl;
    let profile_picture_here;

    const existingAdmin = await NewAdmin.findById(admin_id);

    // giving them value if no value is provided
    resumeUrl = existingAdmin?.resume; 
    profile_picture_here = existingAdmin?.profile_picture;

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



    const updatedAdmin = await NewAdmin.findByIdAndUpdate(
        admin_id,
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

    if (!updatedAdmin) {
        throw new ApiError(400, "Failed to update the information of employee");
    }

    return res
        .json(
            updatedAdmin
        );
})



module.exports = {
    createAdmin,
    loginAdmin,
    getAdmin,
    updateAdmin
};