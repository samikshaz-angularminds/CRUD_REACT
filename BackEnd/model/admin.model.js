const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required:true
        },
        employee_id: {
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique: true
        },
        password: {
            type:String,
            required:true,
        },
        department:{
            type:String,
            required:true,
        },
        phoneNo: {
            type:String,
            required:true,
        },
        gender: {
            type:String,
            required: true,
            enum: ["Male", "Female", "Other", "Prefer Not To Say"]
        },
        marital_status : {
            type: String,
            required: true,
            enum: ["Married", "Unmarried"]
        }
    }
);

adminSchema.methods.generateToken = function (){
    return jwt.sign(
        {_id : this._id, email: this.email, employee_id: this.employee_id},
        process.env.TOKEN_SECRET,
        {expiresIn: "1d"}
    );
};


const Admin = mongoose.model("Admin",adminSchema);

module.exports = Admin;