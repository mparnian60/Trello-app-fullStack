const mongoose = require ('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: [{
        type: mongoose.Schema.ObjectId,
        ref : 'User'
    }]
})

module.exports = mongoose.model('Board', schema);