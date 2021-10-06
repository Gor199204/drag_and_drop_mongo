const Joi = require('joi')

exports.userValidation = (data) => {

    const schema = Joi.object({
        sequence: Joi.array().items(Joi.string().required()).required(),
        updated_at: Joi.number().required()

    })
    return schema.validate(data)
}