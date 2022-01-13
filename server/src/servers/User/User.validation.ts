const { Joi } = require('express-validation')
export const VALIDATION_USER = {
    body: Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.empty': `email không được phép để trống`,
            }),
        name: Joi.string()
            .messages({
                'string.empty': `name không được phép để trống`,
            }),
        password: Joi.string()
            .required()
            .messages({
                'string.empty': `password không được phép để trống`,
            }),
        phone: Joi.string()
            .allow('', null)
            .regex(/^0[0-9]{9}$/),
        avatar: Joi.string()
            .allow('', null)
    }),
}

export const VALIDATION_update_CUSTOMER = {
    body: Joi.object({
        body: Joi.object({
            email: Joi.string()
                .email()
                .required()
                .messages({
                    'string.empty': `email không được phép để trống`,
                }),
            name: Joi.string()
                .messages({
                    'string.empty': `name không được phép để trống`,
                }),
            password: Joi.string()
                .messages({
                    'string.empty': `password không được phép để trống`,
                }),
            phone: Joi.string()
                .messages({
                    'string.empty': `phone không được phép để trống`,
                }),
        }),
    }),
}

