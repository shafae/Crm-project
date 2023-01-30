const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = mongoose.Schema({
    fName: {
        type: String,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 20,
        required: true
    },
    lName: {
        type: String,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 20,
        required: true
    },
    age: {
        type: Number,
        min: 21,
        max: 60,
        default: 21
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("invalid email format")
            }
        }
    },
    status: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 5,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value, { minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 4, minSymbols: 1 }))
                throw new Error("invalid password")
        }
    },
    gender: {
        type: String,
        trim: true,
        lowercase: true,
        enum: ["male", "female"]
    },
    dOfBirth: {
        type: Date
    },
    phoneNum: {
        type: String,
        validate(value) {
            if (!validator.isMobilePhone(value, "ar-EG"))
                throw new Error("invalid number")
        }
    },
    roleName: {
        type: String,
        required: true
    },
    addresses: [{
        addressType: {
            type: String,
            trim: true,
            required: true
        },
        details: {}
    }],
    tokens: [{
        token: { type: String, required: true }
    }]
}, {
    timestamps: true
})



userSchema.pre("save", async function() {
    if (this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password, 8)
    }
})
userSchema.statics.loginUser = async(email, password) => {
    const userData = await User.findOne({ email })
    if (!userData) throw new Error("invalid email")
    const validatePassword = await bcryptjs.compare(password, userData.password)
    if (!validatePassword) throw new Error("invalid password")
    return userData
}
userSchema.methods.toJSON = function() {
    const data = this.toObject()
    delete data.__v
    delete data.password
    return data
}
userSchema.methods.generateToken = async function() {
    const userData = this
    const token = jwt.sign({ _id: userData._id }, process.env.tokenPass)
    userData.tokens = userData.tokens.concat({ token })
    await userData.save()
    return token
}
const User = mongoose.model("User", userSchema)
module.exports = User