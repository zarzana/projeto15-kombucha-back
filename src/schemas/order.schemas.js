import joi from "joi"

export const orderSchema = joi.object({
    bairro:joi.string().required(),
    cep:joi.string().required(),
    complemento:joi.string().required(),
    localidade:joi.string().required(),
    logradouro:joi.string().required(),
    nome:joi.string().required(),
    numero:joi.string().required(),
    products:joi.array().required(),
    uf:joi.string().required()
})