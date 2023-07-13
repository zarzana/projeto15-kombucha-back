import { ObjectId } from "mongodb";
import { db } from "../app.js";

export async function postCart(req,res){
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ','');
    const { id } = req.params;

    try {
        const prod = await db.collection("products").findOne({_id:new ObjectId(id)});
        if (!prod) return res.status(404).send('product not found');
        
        const {idUser} = await db.collection("sessions").findOne({token});
        if (!idUser) return res.status(404).send('session not found');

        await db.collection("cart").insertOne({...prod,idUser});
        res.sendStatus(201);
    } catch ({message}) {
        res.status(500).send(message);
    }
}

export async function getCart(req,res){
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ','');

    try {
        const { idUser } = await db.collection("sessions").findOne({token});
        if (!idUser) return res.status(404).send('session not found');

        const list = await db.collection("cart").find({idUser}).toArray();
        res.status(200).send(list);
    } catch ({message}) {
        res.status(500).send(message);
    }
}