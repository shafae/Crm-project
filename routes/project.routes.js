const router = require("express").Router()
const project = require('../app/controller/project.controller')
const { auth } = require("../app/middleware/auth.middleware")
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })



router.post("/addProject", project.addProject)

router.get("/getProject/:id", project.getProject)

router.get("/getAllProjects", project.allProjects)
router.patch("/editProject/:id", project.editProject)

router.delete("/deleteProject/:id", project.deleteProject)



router.patch("/uploadProjectImg/:id", upload.array("project"), project.uploadProjectImg)


module.exports = router