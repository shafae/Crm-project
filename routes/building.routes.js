const router = require("express").Router()
const building = require('../app/controller/building.controller')
const { auth } = require("../app/middleware/auth.middleware")
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })
const { checkRole } = require("../app/middleware/roleAuth.middleware")



router.post("/addBuilding/:projId",auth,checkRole, building.addBuilding)

router.get("/getBuilding/:id", building.getBuilding)
router.get("/getAllBuildings",auth,checkRole, building.allBuildings)
router.get("/getAllProjectBuildings/:projId", building.allProjectBuildings)

router.patch("/editBuilding/:id",auth,checkRole, building.editBuilding)

router.delete("/deleteBuilding/:id",auth,checkRole, building.deleteBuilding)



router.patch("/uploadBuildingImg/:id",auth,checkRole, upload.array("building"), building.uploadBuildingImg)


module.exports = router