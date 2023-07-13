import joi from "joi"

export const cartSchema = joi.object({
    email:joi.string().email().required(),
    id:joi.string().hex().length(24).required()
})

export const cartUserSchema = joi.object({
    email:joi.string().email().required()
})