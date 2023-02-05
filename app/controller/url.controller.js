const urlModel = require("../../db/models/urls.model")
const myHelper = require("../helper")
const upload = require("../middleware/fileUpload.middleware")
class url {

    static addUrl = async(req, res) => {
        try {
            const url = new urlModel(req.body)
            await url.save()
            myHelper.resHandler(res, 200, true, url, "url added successfully")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }


    static editUrl = async(req, res) => {
        try {
            const url = await urlModel.findOneAndUpdate({ _id: req.params.id }, {...req.body })
            if (!url) throw new Error("url not found")
            myHelper.resHandler(res, 200, true, " ", "data updated")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)

        }
    }

    static deleteUrl = async(req, res) => {
        try {
            const url = await urlModel.deleteOne({ _id: req.params.id })
            if (!url) throw new Error("url not found")
            myHelper.resHandler(res, 200, true, " ", "url deleted")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)

        }
    }

    static allUrls = async(req, res) => {
        try {
            const urls = await urlModel.find()
            myHelper.resHandler(res, 200, true, urls, "urls fetched")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static getUrl = async(req, res) => {
        try {
            const url = await urlModel.findById(req.params.id)
            myHelper.resHandler(res, 200, true, url, "url fetched")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static addRole = async(req, res) => {
        try {
            const url = await urlModel.findById(req.params.id)
            url.roles.push(req.body.roles)
            await url.save()
            myHelper.resHandler(res, 200, true, url, "updated")

        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
}
module.exports = url