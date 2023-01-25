const router = require("express").Router()
const payment = require('../app/controller/payment.controller')
const { auth } = require("../app/middleware/auth.middleware")
const { checkRole } = require("../app/middleware/roleAuth.middleware")



router.post("/addPayment/:id",auth,checkRole, payment.addPayment)

router.get("/getPayment/:id",auth,checkRole, payment.getPayment)

router.get("/getAllPayments",auth,checkRole, payment.allPayments)
router.get("/getAllUnitPayments/:unitId",auth,checkRole, payment.allUnitPayments)

router.patch("/editPayment/:id",auth,checkRole, payment.editPayment)

router.delete("/deletePayment/:id",auth,checkRole, payment.deletePayment)

router.post("/generatePdf/:id",auth,checkRole, payment.generatePDF)
router.get("/getPdf/:id",auth,checkRole, payment.getPdf)





module.exports = router