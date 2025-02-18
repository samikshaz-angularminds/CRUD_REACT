const ApiError = require("../utils/ApiError.utils");
const asyncHandler = require("../utils/AsyncHandler.utils");
const jwt = require("jsonwebtoken");
const Admin = require("../model/admin.model");

verifyToken = asyncHandler(async (req, res, next) => {

    console.log("verify from req.. ", req.header("Authorization"));
    

    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

        console.log("token- ",token);
        

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        if (!decodedToken) {
            throw new ApiError(400, "Failed to decode the token");
        }

        const admin = await Admin.findById(decodedToken._id);

        if (!admin) {
            throw new ApiError(401, "Invalid access token");
        }

        req.admin = admin;

        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

module.exports = verifyToken;