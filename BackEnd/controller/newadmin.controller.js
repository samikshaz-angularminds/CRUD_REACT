const NewAdmin = require("../model/newAdmin.model");
const asyncHandler = require("../utils/AsyncHandler.utils");
const ApiError = require("../utils/ApiError.utils");
const cloudinary = require("../config/cloudinary.config");

const createAdmin = asyncHandler(async (req, res) => {
    let requestBody = req.body;
    const requestFiles = req.files;

    console.log('====================================');
    console.log("request body-------> ",requestBody);
    console.log('====================================');

    console.log('====================================');
    console.log("request files: ",requestFiles.resume[0]);
    console.log('====================================');
    console.log("request files: ",requestFiles.profile_picture[0]);

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

    const profile_picture_Upload = await cloudinary.uploader.upload(requestFiles.profile_picture[0].path,({
        resource_type: "image",
        folder: "Crud_ProfilePic"
    })) 
    const resumeUrl = resumeUpload.url;

    const profile_picture = {
        public_id : profile_picture_Upload.public_id,
        url : profile_picture_Upload.url
    }

    requestBody.resume = resumeUrl;
    requestBody.profile_picture = profile_picture;

    const newAdmin = await NewAdmin.create(requestBody);

    return res.json(newAdmin);
});


module.exports = {
    createAdmin
};