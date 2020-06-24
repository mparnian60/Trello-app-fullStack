const mongoose = require ('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    boardId: [{
        type: mongoose.Schema.ObjectId,
        ref : 'Board'
    }]
})

module.exports = mongoose.model('List', schema);