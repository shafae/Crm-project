const router = require("express").Router()
const building = require('../app/controller/building.controller')
const { auth } = require("../app/middleware/auth.middleware")
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })



router.post("/addBuilding/:projId", building.addBuilding)

router.get("/getBuilding/:id", building.getBuilding)

router.get("/getAllBuildings", building.allBuildings)
router.patch("/editBuilding/:id", building.editBuilding)

router.delete("/deleteBuilding/:id", building.deleteBuilding)



router.patch("/uploadBuildingImg/:id", upload.array("building"), building.uploadBuildingImg)


module.exports = router