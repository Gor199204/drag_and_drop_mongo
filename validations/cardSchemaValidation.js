const Joi = require('joi')

exports.userValidation = (data) => {

    const schema = Joi.object({
        title: Joi.string().min(1).max(255).required(),
        description: Joi.string().min(1).max(255).required(),
        created_at: Joi.number().integer().min(1).max(255).required(),
        updated_at: Joi.number().integer().min(1).max(255).required()

    })
    return schema.validate(data)
}