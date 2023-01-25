const router = require("express").Router()
const unit = require('../app/controller/unit.controller')
const { auth } = require("../app/middleware/auth.middleware")
const { checkRole } = require("../app/middleware/roleAuth.middleware")
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })



router.post("/addUnit/:buildId",auth,checkRole, unit.addUnit)

router.get("/getUnit/:id", unit.getUnit)

router.get("/getAllUnits",auth,checkRole, unit.allUnits)
router.get("/getAllBuildingUnits/:buildId", unit.allBuildingUnits)

router.patch("/editUnit/:id",auth,checkRole, unit.editUnit)

router.delete("/deleteUnit/:id",auth,checkRole, unit.deleteUnit)

router.patch("/buyUnit/:id",auth,checkRole, unit.buyUnit)

router.patch("/uploadUnitImg/:id",auth,checkRole, upload.array("unit"), unit.uploadUnitImg)


module.exports = router