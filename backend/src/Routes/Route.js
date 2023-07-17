const express = require('express')
const router = express.Router() // const router = express.router()
const { CreateUser, LoginUser, getUser } = require('../controller/UserController')
const {createNote, getNote, updateNote, deleteNote}  = require('../controller/NoteController')
const {auth} = require('../middleware/Authentication')


router.get("/test", (req, res) => {
    res.send("My First ever Api")
})

router.get("/", (req, res) => {
    res.send("root", req.body)
})

router.post("/createUser", CreateUser)
router.post("/login", LoginUser)
router.get('/getUser',auth, getUser)

router.post('/createNote',auth,  createNote)
router.get('/getNotes',auth, getNote)
router.put('/updateNote/:noteId',auth, updateNote )
router.delete('/deleteNote/:noteId',auth, deleteNote )



module.exports = router // module.export = router 