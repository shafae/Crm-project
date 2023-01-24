const router = require("express").Router()
const User = require('../app/controller/user.controller')
const { auth } = require("../app/middleware/auth.middleware")
const upload = require("../app/middleware/fileUpload.middleware")


router.post("/register", User.register)
router.post("/login", User.login)

router.post("/me", auth, User.profile)
router.get("/", auth, User.allUsers)
router.post("/logout", auth, User.logOut)
router.post("/logoutAll", auth, User.logOutAll)
router.get("/user/:id", auth, User.getUser)

router.post("/addAddr", auth, User.addAddr)

router.post("/addMethods", auth, User.addMethods)

router.patch("/changePassword", auth, User.changePassword)
router.patch("/editUser", auth, User.editUser)

router.delete("/deleteUser", auth, User.deleteUser)



router.patch("/profileImg", auth, upload.single("img"), User.uploadImage)


module.exports = router