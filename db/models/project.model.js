const mongoose = require("mongoose");
const projectSchema = mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["buy", "show"],
        default: "buy"
    },
    projectImg: [{
        type: String,
        trim: true
    }]
});

const project = mongoose.model("project", projectSchema);
module.exports = project;