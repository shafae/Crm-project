const router = require("express").Router()
const unit = require('../app/controller/unit.controller')
const { auth } = require("../app/middleware/auth.middleware")
const upload = require("../app/middleware/fileUpload.middleware")



router.post("/addUnit/:buildId", unit.addUnit)

router.get("/getUnit/:id", unit.getUnit)

router.get("/getAllUnits", unit.allUnits)
router.get("/getAllBuildingUnits", unit.allBuildingUnits)

router.patch("/editUnit/:id", unit.editUnit)

router.delete("/deleteUnit/:id", unit.deleteUnit)

router.patch("/buyUnit/:id", unit.buyUnit)

router.patch("/uploadUnitImg/:id", upload.array("unit"), unit.uploadUnitImg)


module.exports = router