const mongoose = require("mongoose");
const buildingSchema = mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project"
    },
    buildNum: {
        type: Number,
        required: true
    },
    floorsNum: {
        type: Number,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    buildingImg: [{
        type: String,
        trim: true
    }]
});

const building = mongoose.model("building", buildingSchema);
module.exports = building;