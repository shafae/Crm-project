const router = require("express").Router()
const url = require('../app/controller/url.controller')
const { auth } = require("../app/middleware/auth.middleware")
const upload = require("../app/middleware/fileUpload.middleware")



router.post("/addUrl", url.addUrl)

router.get("/getUrl/:id", url.getUrl)

router.get("/getAllUrl", url.allUrls)
router.patch("/editUrl/:id", url.editUrl)

router.delete("/deleteUrl/:id", url.deleteUrl)



module.exports = router