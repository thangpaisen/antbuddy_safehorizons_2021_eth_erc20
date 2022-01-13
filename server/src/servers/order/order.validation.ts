const { Joi } = require('express-validation')
export const VALIDATION_ORDER = {
    body: Joi.object({
        quantity: Joi.number()
            .required()
    }),
}