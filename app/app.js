const express = require("express")
const path = require("path")
const cors = require("cors")
const app = express()
app.use(cors())
require("../db/connect")
app.use(express.json())
app.use("/uploads",express.static(path.join(__dirname, "../uploads")))
const userRoutes = require("../routes/user.routes")
const urlRoutes = require("../routes/urls.routes")
const roleRoutes = require("../routes/role.routes")
const projectRoutes = require("../routes/project.routes")
const buildingRoutes = require("../routes/building.routes")
const unitRoutes = require("../routes/unit.routes")
const paymentRoutes = require("../routes/payment.routes")


app.use("/api/user/", userRoutes)
app.use("/api/url/", urlRoutes)
app.use("/api/role/", roleRoutes)
app.use("/api/project/", projectRoutes)
app.use("/api/building/", buildingRoutes)
app.use("/api/unit/", unitRoutes)
app.use("/api/payment/",paymentRoutes)


app.all("*", (req, res) => {
    res.status(404).send({
        apisStatus: false,
        message: "Invalid URL",
        data: {}
    })
})
module.exports = app