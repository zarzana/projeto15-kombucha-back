import joi from "joi"

export const cartSchema = joi.object({
    list:joi.array().required()
})

export const cartUserSchema = joi.object({
    email:joi.string().email().required()
})