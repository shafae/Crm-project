const paymentModel = require("../../db/models/payment.model")
const unitModel= require("../../db/models/unit.model")
const myHelper = require("../helper")
class payment {

    static addPayment = async(req, res) => {
        try {
            const payment = new paymentModel({clientId:req.params.clientId, employeeId: req.user.id, unitId:req.params.id, ...req.body })
            await payment.save()
            myHelper.resHandler(res, 200, true, payment, "payment added successfully")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }



    static editPayment = async(req, res) => {
        try {
            const payment = await paymentModel.findOneAndUpdate({ _id: req.params.id }, {...req.body })
            if (!payment) throw new Error("payment not found")
            myHelper.resHandler(res, 200, true, " ", "payment updated")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)

        }
    }

    static deletePayment = async(req, res) => {
        try {
            const payment = await paymentModel.deleteOne({ _id: req.params.id })
            if (!payment) throw new Error("payment not found")
            myHelper.resHandler(res, 200, true, " ", "payment deleted")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)

        }
    }

    static allPayments = async(req, res) => {
        try {
            const Payments = await paymentModel.find()
            myHelper.resHandler(res, 200, true, Payments, "Payments fetched")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static allUnitPayments = async(req, res) => {
        try {
            const Payments = await paymentModel.find({unitId:req.params.unitId})
            myHelper.resHandler(res, 200, true, Payments, "Payments fetched")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static getPayment = async(req, res) => {
        try {
            const payment = await paymentModel.findById(req.params.id)
            myHelper.resHandler(res, 200, true, payment, "payment fetched")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static generatePDF =async(req,res)=>{
        try {
         const paymentId = req.params.id
         const payment = await paymentModel.findOne({ _id: paymentId });
         await myHelper.generatePdf(paymentId, payment);
            myHelper.resHandler(res, 200, true, "", "pdf generated successfully fetched")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static getPdf = async(req, res) => {
        try {
            const pdf = myHelper.getFilePath(`../uploads/pdf/${req.params.id}.pdf`)
            myHelper.resHandler(res, 200, true, pdf , "payment fetched")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }



}
module.exports = payment