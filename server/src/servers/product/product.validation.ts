const { Joi } = require('express-validation')
export const VALIDATION_PRODUCT = {
    body: Joi.object({
        categories_id: Joi.string()
            .required()
            .messages({
                'string.empty': `categories_id không được phép để trống`,
            }),
        product_name: Joi.string()
            .required()
            .messages({
                'string.empty': `product_name không được phép để trống`,
            }),
        description: Joi.string()
            .messages({
                'string.empty': `description không được phép để trống`,
            }),
        price: Joi.number()
            .required(),
        picture: Joi.string()
            .required()
            .messages({
                'string.empty': `picture không được phép để trống`,
            }),
    }),
}