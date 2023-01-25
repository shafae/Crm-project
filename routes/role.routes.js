const router = require("express").Router()
const role = require('../app/controller/role.controller')
const { auth } = require("../app/middleware/auth.middleware")
const { checkRole } = require("../app/middleware/roleAuth.middleware")



router.post("/addRole",auth,checkRole, role.addRole)


router.get("/getAllRole",auth,checkRole, role.allRoles)

router.patch("/editRole/:id",auth,checkRole, role.editRole)

router.delete("/deleteRole/:id",auth,checkRole, role.deleteRole)



module.exports = router