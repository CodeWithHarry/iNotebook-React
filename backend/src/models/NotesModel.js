const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true

    },
    description: {
        type: String,
        require: true
    },
    tag: {
        type: String,
        default: "General"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

module.exports = mongoose.model('note', noteSchema) //converting schema to model