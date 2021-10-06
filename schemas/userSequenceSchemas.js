const mongoose = require('mongoose');


let UserSequenceSchemas = new mongoose.Schema({
    
    sequence: {
        type: Array,
        required: true,
    },
    updated_at: {
        type: Number,
        required: true
    }
})

const user_seq_schema = mongoose.model('UserSeq', UserSequenceSchemas);

module.exports = user_seq_schema