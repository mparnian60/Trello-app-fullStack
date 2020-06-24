const mongoose = require ('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    cards: [{
        type: mongoose.Schema.ObjectId,
        ref : 'Card'
    }]
})

module.exports = mongoose.model('List', schema);