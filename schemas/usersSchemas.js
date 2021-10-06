const mongoose = require('mongoose')


let UsersSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true
    },
    subscribed_to_cards: {
        type: Array,
        required: true
    },
    created_at: {
        type: Number,
        required: false,
    },
    updated_at: {
        type: Number,
        required: false,
    }
})


const users_schema = mongoose.model('Users', UsersSchema);
module.exports = users_schema

