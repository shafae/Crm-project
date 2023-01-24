const mongoose = require("mongoose");
const roleSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
    },
});

const role = mongoose.model("role", roleSchema);
module.exports = role;