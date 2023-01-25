const router = require("express").Router()
const User = require('../app/controller/user.controller')
const { auth } = require("../app/middleware/auth.middleware")
const { checkRole } = require("../app/middleware/roleAuth.middleware")
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })

router.post("/register",auth,checkRole,User.register)
router.post("/login", User.login)

router.get("/myProfile", auth,checkRole, User.profile)
router.get("/", auth,checkRole, User.allUsers)
router.get("/getUser/:id", auth,checkRole, User.getUser)

router.post("/logout", auth,checkRole, User.logOut)
router.post("/logoutAll", auth,checkRole, User.logOutAll)


router.post("/addAddr", auth,checkRole, User.addAddr)

router.patch("/changePassword", auth,checkRole, User.changePassword)
router.patch("/editUser/:id", auth,checkRole, User.editUser)

router.delete("/deleteUser/:id", auth,checkRole, User.deleteUser)

router.patch("/profileImg", auth,checkRole, upload.single("img"), User.uploadImage)


module.exports = router