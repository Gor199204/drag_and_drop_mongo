const Joi = require('joi')

exports.userValidation = (data) => {

    const schema = Joi.object({
        firstName: Joi.string().min(2).max(255).required(),
        lastName: Joi.string().min(2).max(255).required(),
        country: Joi.string().min(2).max(30).required(),
        email: Joi.string().email().min(4).max(255).required(),
        age: Joi.number().integer().min(1).max(3).required(),
        subscribed_to_cards: Joi.array().items(Joi.string().required()).required(),
        created_at: Joi.number().required(),
        updated_at: Joi.number().required()
    })
    return schema.validate(data)
}