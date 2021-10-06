const mongoose = require('mongoose');

let CardsSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },
    list_id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created_at: {
        type: Number,
        required: true,
        unique: true,
    },
    updated_at: {
        type: Number,
        required: true
    }
})

// module.exports = model('CardsSchema', CardsSchema)
const card_schema = mongoose.model('Cards', CardsSchema)

module.exports = card_schema