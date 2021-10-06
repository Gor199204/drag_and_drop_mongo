const mongoose = require('mongoose');


let ListsSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },
    card_positions: {
        type: Array,
        required: false
    },
    position: {
        type: Number,
        required: false
    },
    created_at: {
        type: Number,
        required: false,
        unique: true,
    },
    updated_at: {
        type: Number,
        required: false
    }
})

const list_schema = mongoose.model('Lists', ListsSchema);

module.exports = list_schema;