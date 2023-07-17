import { db } from "../app.js";

export async function postOrder(req,res){
    const data = req.body
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ','');

    try {
        const { idUser } = await db.collection("sessions").findOne({token});
        if (!idUser) return res.status(404).send('session not found');

        await db.collection("orders").insertOne({...data,idUser})
        res.sendStatus(200);
    } catch ({message}) {
        res.status(500).send(message);
    }
}