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

        await db.collection("cart").insertOne({...prod,idUser,qtd:1});
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

export async function postManyCart(req,res){
    const { authorization } = req.headers;
    const {list} = req.body;
    const token = authorization.replace('Bearer ','');
    list.map(element=>{
        element._id = new ObjectId(element._id)
        element.idUser = new ObjectId(element.idUser)
    })

    try {
        const {idUser} = await db.collection("sessions").findOne({token});
        await db.collection("cart").deleteMany({idUser})
        list.length==0?"":await db.collection("cart").insertMany(list)
        res.sendStatus(200)
    } catch ({message}) {
        res.status(500).send(message)
    }
}