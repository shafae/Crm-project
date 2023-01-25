const userModel = require("../../db/models/user.model")
const myHelper = require("../helper")
const fs = require("fs")
class User {
    static register = async(req, res) => {
        try {
            if (req.body.password.length < 6) throw new Error("password must be more than 6")
            const userData = new userModel(req.body)
            await userData.save()
            myHelper.resHandler(res, 200, true, userData, "user added successfully")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static login = async(req, res) => {
        try {
            const user = await userModel.loginUser(req.body.email, req.body.password)
            const token = await userData.generateToken()
            myHelper.resHandler(res, 200, true, { user, token }, "user added successfully")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static allUsers = async(req, res) => {
        try {
            const users = await userModel.find()
            myHelper.resHandler(res, 200, true, users, "users fetched")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static profile = (req, res) => {
        myHelper.resHandler(res, 200, true, { user: req.user }, "user profile fetched")
    }
    static logOut = async(req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter(
                t => t.token != req.token
            )
            await req.user.save()
            myHelper.resHandler(res, 200, true, null, "logged out")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static logOutAll = async(req, res) => {
        try {
            req.user.tokens = []
            await req.user.save()
            myHelper.resHandler(res, 200, true, null, "logged out")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static getUser = async(req, res) => {
        try {
            const user = await userModel.findById(req.params.id)
            myHelper.resHandler(res, 200, true, user, "user fetched")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static changeStatus = async(req, res) => {
        try {
            let user = req.user
            if (!req.query.current || req.query.current == "0")
                user = await userModel.findById(req.body._id)

            if (req.query.activate == "1") user.status = true
            else user.status = false
            await user.save()
            myHelper.resHandler(res, 200, true, user, "updated")

        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static addAddr = async(req, res) => {
        try {
            if (!req.user.addresses) req.user.addresses = []
            req.user.addresses.push(req.body)
            await req.user.save()
            myHelper.resHandler(res, 200, true, req.user, "updated")

        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static uploadImage = async(req, res) => {
        try {
            const ext = req.file.originalname.split(".").pop()
            const newName = "uploads/profile/" + Date.now() + "testApp." + ext
            fs.renameSync(req.file.path, newName)
            req.user.image = newName
            await req.user.save()
            myHelper.resHandler(res, 200, true, req.user, "updated")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
 

    static editUser = async(req, res) => {
        try {
            const user = await userModel.findOneAndUpdate({ _id: req.params.id }, {...req.body })
            if (!user) throw new Error("user not found")
            myHelper.resHandler(res, 200, true, " ", "data updated")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)

        }
    }

    static changePassword = async(req, res) => {
        try {
            const user = await userModel.findById(req.user._id)
            user.password = req.body.password
            await user.save()
            myHelper.resHandler(res, 200, true, req.user, "password changed")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static deleteUser = async(req, res) => {
        try {
            const user = await userModel.deleteOne({ _id: req.params.id })
            if (!user) throw new Error("user not found")
            myHelper.resHandler(res, 200, true, " ", "user deleted")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)

        }
    }
}
module.exports = User