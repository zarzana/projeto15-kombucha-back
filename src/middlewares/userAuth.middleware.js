import { db } from "../app.js";

export const userAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.sendStatus(401);

  try{
    const token = authorization.replace('Bearer ', '');
    const session = await db.collection('sessions').findOne({ token });
    if (!session) return res.sendStatus(401);

    next();
    
  } catch ({ message }) {
    res.status(500).send(message);
  }

};
