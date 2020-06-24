const mongoose = require ('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    listId: [{
        type: mongoose.Schema.ObjectId,
        ref : 'List'
    }]
})

module.exports = mongoose.model('Card', schema);