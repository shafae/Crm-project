const mongoose = require("mongoose");
const urlsSchema = mongoose.Schema({
    link: {
        type: String,
        unique: true,
    },
    methods: [{
        type: String,
    }, ],
    queries: [{
        type: String,
    }, ],
    params: [{
        type: String,
    }, ],
    roles: [{
        type: String,
    }, ],
});

const url = mongoose.model("url", urlsSchema);
module.exports = url;