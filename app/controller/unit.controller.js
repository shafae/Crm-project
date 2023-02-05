const unitModel = require("../../db/models/unit.model")
const userModel = require("../../db/models/user.model")
const myHelper = require("../helper")
const fs = require("fs")
class unit {

    static addUnit = async(req, res) => {
        try {
            const unit = new unitModel({ buildingId: req.params.buildId, ...req.body })
            await unit.save()
            myHelper.resHandler(res, 200, true, unit, "unit added successfully")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static uploadUnitImg = async(req, res) => {
        try {
            const unit = await unitModel.findById(req.params.id)
            if (!unit) throw new Error("unit not found")

            req.files.map(async(file) => {
                try {
                    const ext = file.originalname.split(".").pop()
                    const newName = "uploads/unit/" + Date.now() + "crmApp." + ext
                    fs.renameSync(file.path, newName)
                    unit.unitImg.push(newName)
                    await unit.save()
                } catch (e) {
                    console.log(e)
                }
            })


            myHelper.resHandler(res, 200, true, "", "uploaded")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static editUnit = async(req, res) => {
        try {
            const unit = await unitModel.findOneAndUpdate({ _id: req.params.id }, {...req.body })
            if (!unit) throw new Error("unit not found")
            myHelper.resHandler(res, 200, true, " ", "data updated")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)

        }
    }

    static deleteUnit = async(req, res) => {
        try {
            const unit = await unitModel.deleteOne({ _id: req.params.id })
            if (!unit) throw new Error("unit not found")
            myHelper.resHandler(res, 200, true, " ", "unit deleted")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)

        }
    }

    static allUnits = async(req, res) => {
        try {
            const units = await unitModel.find()
            myHelper.resHandler(res, 200, true, units, "units fetched")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static getUnit = async(req, res) => {
        try {
            const unit = await unitModel.findById(req.params.id)
            myHelper.resHandler(res, 200, true, unit, "unit fetched")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static allBuildingUnits = async(req, res) => {
        try {
            const units = await unitModel.find({ buildingId: req.params.buildId })
            myHelper.resHandler(res, 200, true, units, "units fetched")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static getClientUnits = async(req, res) => {
        try {
            const units = await unitModel.find({ clientId: req.user.id })
            myHelper.resHandler(res, 200, true, units, "units fetched")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static buyUnit = async(req, res) => {
        try {
            const client = await userModel.findOne({ email: req.body.email })
            const unit = await unitModel.findOneAndUpdate({ _id: req.params.id }, { clientId: client._id, status: "bought" })
            myHelper.resHandler(res, 200, true, "", "unit bought")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }


}
module.exports = unit