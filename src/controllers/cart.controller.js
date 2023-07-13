import { ObjectId } from "mongodb";
import { db } from "../app.js";

export async function postCart(req,res){
    const {id,email} = req.body

    try {
        const prod = await db.collection("products").findOne({"_id":new ObjectId(id)})
        await db.collection("cart").insertOne({...prod,email,id})
        res.sendStatus(201)
    } catch ({message}) {
        res.status(500).send(message)
    }
}

export async function getCart(req,res){
    const {authorization} = req.headers
    const token = authorization.replace('Bearer ','')

    try {
        const {idUser} = await db.collection("sessions").findOne({token})
        const {email} = await db.collection("users").findOne({_id:idUser})
        const list = await db.collection("cart").find({email}).toArray()
        res.status(302).send(list)
    } catch ({message}) {
        res.status(500).send(message)
    }
}