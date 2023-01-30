const router = require("express").Router()
const url = require('../app/controller/url.controller')
const { auth } = require("../app/middleware/auth.middleware")
const { checkRole } = require("../app/middleware/roleAuth.middleware")



router.post("/addUrl", url.addUrl)

router.get("/getUrl/:id",auth,checkRole, url.getUrl)

router.get("/getAllUrl",auth,checkRole, url.allUrls)

router.post("/addRoleToUrl/:id",auth,checkRole,url.addRole)
router.patch("/editUrl/:id",auth,checkRole, url.editUrl)

router.delete("/deleteUrl/:id",auth,checkRole, url.deleteUrl)



module.exports = router