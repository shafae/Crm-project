const mongoose = require("mongoose");
const paymentSchema = mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    employeeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    unitId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "unit"
    },
    payMethod:{
        type:String,
        enum:["cash","qarture","half","year"],
        required:true
    },
    numOfYears:{
        type:Number,
        required:true
    }
});

const payment = mongoose.model("payment", paymentSchema);
module.exports = payment;