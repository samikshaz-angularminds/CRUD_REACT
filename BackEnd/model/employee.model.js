const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        admin: {
            type:String,
            required:true
        },
        employee_id: {
            type:String,
            required:true
        },
        name: {
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique: true
        },
        department:{
            type:String,
            required:true,
        },
        designation: {
            type: String,
            required: true
        },
        phoneNo: {
            type:String,
            required:true,
        },
        gender: {
            type:String,
            required: true,
            enum: ["Male", "Female", "Other"]
        },
        marital_status : {
            type: String,
            required: true,
            enum: ["Married", "Unmarried"]
        }
    }
);

const Employee = mongoose.model("Employee",employeeSchema);

module.exports = Employee;