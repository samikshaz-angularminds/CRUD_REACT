const mongoose = require("mongoose");

const newEmployeeSchema = new mongoose.Schema(
    {
        admin: {
            type: String,
            required: true
        },
        employee_id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        linkedIn: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        workShift: {
            type: [String],
            required: true,
            enum: ["Night", "Day", "Evening"]
        },
        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female", "Other"]
        },
        experience: {
            type: Number,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        date_of_joining: {
            type: String,
            required: true
        },
        resume: {
            type: String,
            required: true
        }
    }
);



const NewEmployee = mongoose.model("NewEmployee", newEmployeeSchema);

module.exports = NewEmployee;