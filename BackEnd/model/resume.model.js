const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    public_id : {
        type: String,
        required: true
    },
    url : {
        type:String,
        required: true
    }
})

const Resume = mongoose.model("Resume",resumeSchema);

module.exports = Resume;