const mongoose = require ('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    lists: [{
        type: mongoose.Schema.ObjectId,
        ref : 'List'
    }]
})

module.exports = mongoose.model('Board', schema);