const projectModel = require("../../db/models/project.model")
const myHelper = require("../helper")
const fs = require("fs")

class project {

    static addProject = async(req, res) => {
        try {
            const project = new projectModel(req.body)
            await project.save()
            myHelper.resHandler(res, 200, true, project, "project added successfully")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static uploadProjectImg = async(req, res) => {
        try {
            const project = await projectModel.findById(req.params.id)
            if (!project) throw new Error("project not found")

            req.files.map(async(file) => {
                try {
                    const ext = file.originalname.split(".").pop()
                    const newName = "uploads/project/" + Date.now() + "crmApp." + ext
                    fs.renameSync(file.path, newName)
                    project.projectImg.push(newName)
                    await project.save()
                } catch (e) {
                    console.log(e)
                }
            })


            myHelper.resHandler(res, 200, true, "", "uploaded")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static editProject = async(req, res) => {
        try {
            const project = await projectModel.findOneAndUpdate({ _id: req.params.id }, {...req.body })
            if (!project) throw new Error("project not found")
            myHelper.resHandler(res, 200, true, " ", "data updated")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)

        }
    }

    static deleteProject = async(req, res) => {
        try {
            const project = await projectModel.deleteOne({ _id: req.params.id })
            if (!role) throw new Error("project not found")
            myHelper.resHandler(res, 200, true, " ", "project deleted")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)

        }
    }

    static allProjects = async(req, res) => {
        try {
            const projects = await projectModel.find()
            myHelper.resHandler(res, 200, true, projects, "projects fetched")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static getProject = async(req, res) => {
        try {
            const project = await projectModel.findById(req.params.id)
            myHelper.resHandler(res, 200, true, project, "project fetched")
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
}
module.exports = project