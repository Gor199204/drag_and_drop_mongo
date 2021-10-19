const mongoose = require('mongoose'),
    listSchema = require('./listsSchemas');
const Schema = mongoose.Schema;

let CardsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    list_id: {
        type: Schema.Types.ObjectId,
        ref: 'Lists',
        required: false
    },
    description: {
        type: String,
        default: ""
    }
}, { timestamps: true })

// module.exports = model('CardsSchema', CardsSchema)
const card_schema = mongoose.model('Cards', CardsSchema)

module.exports = card_schema
