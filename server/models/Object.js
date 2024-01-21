const mongoose = require('mongoose');

const ObjectSchema = new mongoose.Schema({
    room_id: {
        type: String,
        required: [true, 'Please provide company name'],
        maxLength: 50,
    },
    usage: {
        type: [{
            time: String,  
            value: Number
            }],
        default: []
    },
    threshold: {
        type: Number,
        required: [true, 'Please provide threshold']
    }
});

module.exports = mongoose.model('Object', ObjectSchema);