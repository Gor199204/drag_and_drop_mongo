const mongoose = require('mongoose');


let ListsSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },
    card_positions: {
        type: Array,
        default: []
    },
    position: {
        type: Number,
        required: false,
        default:1
    }
}, {timestamps: true})

const list_schema = mongoose.model('Lists', ListsSchema);

module.exports = list_schema;