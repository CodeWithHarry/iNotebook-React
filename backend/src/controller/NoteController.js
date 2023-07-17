const noteModel = require('../models/NotesModel')
const userModel = require('../models/UserModel')
const { mongoose } = require('mongoose')

const createNote = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    try {
        let data = req.body
        let userId = req.decode.userId //taking id from auth api
        data.user = userId

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "body is require !" })
        if (!data.title) return res.status(400).send({ status: false, message: "title require" })
        if (!data.description) return res.status(400).send({ status: false, message: "description require" })
        if (!data.tag) return res.status(400).send({ status: false, message: "tag require" })

        let user = await userModel.findOne({ _id: userId })
        if (!user) return res.status(401).send({ status: false, message: "You are not authorised, user not exist" })

        const saveData = await noteModel.create(data)

        res.status(201).send({ status: true, message: saveData })

    } catch (error) {
        res.status(500).send({ stauts: false, message: error.message })
    }
}

const getNote = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    try {
        const userId = req.decode.userId

        let saveData = await noteModel.find({ user: userId })

        if (saveData.length < 1) return res.status(404).send({ status: false, message: "No Notes found" })

        res.status(200).send({ status: true, message: saveData })

    } catch (error) {
        res.status(500).send({ stauts: false, message: error.message })
    }
}

const updateNote = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    try {
        let { title, description, tag } = req.body
        const noteId = req.params.noteId
        const userId = req.decode.userId

        if(!title) return res.status(404).send({status:false, message:"Title Required"})
        if(!description) return res.status(404).send({status:false, message:"description Required"})
        if(!tag) {tag = "General"}

        // console.log(noteId)
        // console.log(userId)
        if (!mongoose.isValidObjectId(noteId)) return res.status(400).send({ status: false, message: "No note specified/Wrong noteID" })
        if (!req.body) return res.status(400).send({ status: false, message: "No data found" })

        const findNote = await noteModel.findById(noteId)
        if (!findNote) return res.status(400).send({ status: false, message: "No notes found or deleted" })// note exist or not

        const findUser = await userModel.findById(userId)
        if (!findUser) return res.status(400).send({ status: false, message: "Login with correct credential" }) // user exist ot not

        if (findNote.user.toString() != userId) return res.status(401).send({ status: false, message: "Unauthorized" }) //authorized or not //!why we wrote toString() function

        const saveData = await noteModel.findByIdAndUpdate(noteId, { $set: { title: title, description: description, tag: tag } }, { new: true })
        res.status(200).send({ status: true, message: saveData })

    } catch (error) {
        res.status(500).send({ stauts: false, message: error.message })

    }
}

const deleteNote = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    try {
        const noteId = req.params.noteId
        const userId = req.decode.userId

        if (!mongoose.isValidObjectId(noteId)) return res.status(400).send({ status: false, message: "No note specified/Wrong noteID" })

        const findNote = await noteModel.findById(noteId)
        if (!findNote) return res.status(400).send({ status: false, message: "No notes found or deleted" })// note exist or not

        const findUser = await userModel.findById(userId)
        if (!findUser) return res.status(400).send({ status: false, message: "Login with correct credential" })

        if (findNote.user.toString() != userId) return res.status(401).send({ status: false, message: "Unauthorized" }) //authorized or not

        await noteModel.findByIdAndDelete(noteId)
        res.status(200).send({ status: true, message: "Note deleted successfully" })

    } catch (error) {
        res.status(500).send({ stauts: false, message: error.message })

    }
}

module.exports.createNote = createNote
module.exports.getNote = getNote
module.exports.updateNote = updateNote
module.exports.deleteNote = deleteNote