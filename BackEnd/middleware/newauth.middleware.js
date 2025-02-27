const ApiError = require("../utils/ApiError.utils");
const asyncHandler = require("../utils/AsyncHandler.utils");
const jwt = require("jsonwebtoken");
const NewAdmin = require("../model/newAdmin.model");

const verifyNewToken = asyncHandler(async (req,res,next) => {
    try {
        const token = req.cookies?.loginToken || req.header("Authorization").replace("Bearer ","");

        // console.log('====================================');
        // console.log("token is-------> ",token);
        // console.log('====================================');

        if(!token){
            throw new ApiError(401, "No token found");
        }

        const decodedToken = jwt.verify(token,process.env.NEW_TOKEN_SECRET);

        // console.log('====================================');
        // console.log("DECODED TOKEN IS--------> ",decodedToken);
        // console.log('====================================');

        const new_admin = await NewAdmin.findById(decodedToken._id);

        if(!new_admin){
            throw new ApiError(404,"Admin not found");
        }

        req.new_admin = new_admin;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid token");
    }
})

module.exports = verifyNewToken;