const router = require("express").Router()
const project = require('../app/controller/project.controller')
const { auth } = require("../app/middleware/auth.middleware")
const { checkRole } = require("../app/middleware/roleAuth.middleware")
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })



router.post("/addProject",auth,checkRole, project.addProject)

router.get("/getProject/:id", project.getProject)
router.get("/getAllProjects", project.allProjects)

router.patch("/editProject/:id",auth,checkRole, project.editProject)
router.patch("/uploadProjectImg/:id",auth,checkRole, upload.array("project"), project.uploadProjectImg)

router.delete("/deleteProject/:id",auth,checkRole, project.deleteProject)



module.exports = router