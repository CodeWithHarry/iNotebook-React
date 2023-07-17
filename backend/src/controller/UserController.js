const userModel = require('../models/UserModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const JWT_SECRETKEY = "notebook"

const CreateUser = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    try {
        let data = req.body

        //Validation
        if (!data.name) return res.status(400).send({ status: false, message: "Name require" })
        if (!data.email) return res.status(400).send({ status: false, message: "email require" })
        if (!data.password) return res.status(400).send({ status: false, message: "password require" })
        let email = await userModel.findOne({ email: data.email })
        if (email) return res.status(404).send({ status: false, message: "Email already exist!" })

        // Creating secure password using bcrypt
        const salt = await bcrypt.genSalt(10) // Creating salt
        const secPass = await bcrypt.hash(data.password, salt) //creating hash form of password

        //Creating documment
        const savedData = await userModel.create({ name: data.name, email: data.email, password: secPass })

        //Authentication using JWT
        const token = jwt.sign({ userId: savedData._id }, JWT_SECRETKEY)

        res.setHeader("x-api-key", token); // set token in header (name,token)
        res.status(201).send({ status: true, token: token})

    }
    catch (error) {
        //collecting backend error
        res.status(500).send({ stauts: false, message: error.message })

    }
}

const LoginUser = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    try {

        let data = req.body

        if (!data.email) return res.status(400).send({ status: false, message: "email require" })
        if (!data.password) return res.status(400).send({ status: false, message: "password require" })

        // Verifying user(email) from Databse
        let validateUser = await userModel.findOne({ email: data.email })
        if (!validateUser) return res.status(404).send({ status: false, message: "Invalid User" })

        // Verifying hashed password from DATABASE
        let passwordCompare = await bcrypt.compare(data.password, validateUser.password)
        if (!passwordCompare) return res.status(404).send({ status: false, message: "Invalid User" })

        let token = jwt.sign({ userId: validateUser._id }, JWT_SECRETKEY)

        res.setHeader("x-api-key", token);
        res.status(200).send({ status: true, message: "Login successFull", token:token})

    } catch (error) {
        res.status(500).send({ stauts: false, message: error.message })
    }
}

const getUser = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    try {
        let userId = req.decode.userId

        let user = await userModel.findOne({ _id: userId })
        if (!user) return res.status(401).send({ status: false, message: "You are not authorised, user not exist" })

        let saveData = await userModel.find()
        res.status(200).send({ status: true, message: saveData })
    } catch (error) {
        res.status(500).send({ stauts: false, message: error.message })

    }
}

module.exports.CreateUser = CreateUser
module.exports.LoginUser = LoginUser
module.exports.getUser = getUser