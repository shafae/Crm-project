const roleModel = require("../../db/models/role.model")
const myHelper = require("../helper")
const upload = require("../middleware/fileUpload.middleware")
class role {

    static addRole = async(req, res) => {
        try {
            const role = new roleModel(req.body)
            await role.save()
            myHelper.resHandler(res, 200, true, role, "role added successfully")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static allRoles = async(req, res) => {
        try {
            const roles = await roleModel.find()
            myHelper.resHandler(res, 200, true, roles, "roles fetched")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static editRole = async(req, res) => {
        try {
            const role = await roleModel.findOneAndUpdate({ _id: req.params.id }, {title:req.body.title })
            if (!role) throw new Error("role not found")
            myHelper.resHandler(res, 200, true, " ", "data updated")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)

        }
    }

    static deleteRole = async(req, res) => {
        try {
            const role = await roleModel.deleteOne({ _id: req.params.id })
            if (!role) throw new Error("role not found")
            myHelper.resHandler(res, 200, true, " ", "role deleted")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)

        }
    }
}
module.exports = role