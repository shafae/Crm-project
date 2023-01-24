const mongoose = require("mongoose");
const unitSchema = mongoose.Schema({
    buildingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "building"
    },
    unitNum: {
        type: Number,
        required: true
    },
    price: {
        type: Number
    },
    status: {
        type: String,
        enum: ["available", "bought"],
        default: "available"
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    unitImg: [{
        type: String,
        trim: true
    }]
});

const unit = mongoose.model("unit", unitSchema);
module.exports = unit;