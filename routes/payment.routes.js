const router = require("express").Router()
const payment = require('../app/controller/payment.controller')
const { auth } = require("../app/middleware/auth.middleware")



router.post("/addPayment/:id",auth, payment.addPayment)

router.get("/getProject/:id", payment.getPayment)

router.get("/getAllProjects", payment.allPayments)
router.patch("/editProject/:id", payment.editPayment)

router.delete("/deleteProject/:id", payment.deletePayment)

router.post("/generatePdf/:id", payment.generatePDF)
router.get("/getPdf/:id", payment.getPdf)





module.exports = router