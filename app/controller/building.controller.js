const buildingModel = require("../../db/models/building.model")
const myHelper = require("../helper")
const fs = require("fs")
class building {

    static addBuilding = async(req, res) => {
        try {
            const building = new buildingModel({ projectId: req.params.projId, ...req.body })
            await building.save()
            myHelper.resHandler(res, 200, true, building, "building added successfully")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static uploadBuildingImg = async(req, res) => {
        try {
            const building = await buildingModel.findById(req.params.id)
            if (!building) throw new Error("building not found")

            req.files.map(async(file) => {
                try {
                    const ext = file.originalname.split(".").pop()
                    const newName = "uploads/building/" + Date.now() + "crmApp." + ext
                    fs.renameSync(file.path, newName)
                    building.buildingImg.push(newName)
                    await building.save()
                } catch (e) {
                    console.log(e)
                }
            })


            myHelper.resHandler(res, 200, true, "", "uploaded")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static editBuilding = async(req, res) => {
        try {
            const building = await buildingModel.findOneAndUpdate({ _id: req.params.id }, {...req.body })
            if (!building) throw new Error("building not found")
            myHelper.resHandler(res, 200, true, " ", "data updated")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)

        }
    }

    static deleteBuilding = async(req, res) => {
        try {
            const building = await buildingModel.deleteOne({ _id: req.params.id })
            if (!building) throw new Error("building not found")
            myHelper.resHandler(res, 200, true, " ", "building deleted")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)

        }
    }

    static allBuildings = async(req, res) => {
        try {
            const buildings = await buildingModel.find()
            myHelper.resHandler(res, 200, true, buildings, "buildings fetched")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static allProjectBuildings = async(req, res) => {
        try {
            const buildings = await buildingModel.find({ projectId: req.params.projId })
            myHelper.resHandler(res, 200, true, buildings, "buildings fetched")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static getBuilding = async(req, res) => {
        try {
            const building = await buildingModel.findById(req.params.id)
            myHelper.resHandler(res, 200, true, building, "building fetched")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
}
module.exports = building