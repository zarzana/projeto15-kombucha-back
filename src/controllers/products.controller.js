import { ObjectId } from "mongodb";
import { db } from "../app.js";
import { isURL } from "../functions/urlValidation.js";
import { putProductShema } from "../schemas/products.schemas.js";

export const postProduct = async (req, res) => {
  
  //fiz a verificação de float sem a biblioteca joi pelos seguites motivos:
  //https://github.com/hapijs/joi/issues/112
  //https://github.com/hapijs/joi/issues/2699
  if (Number.isInteger(req.body.price)) return res.status(422).send('\"value\" must be a float');

  if (!isURL(req.body.imgUrl)) return res.status(422).send('\"imgUrl\" must be a valid url');

  try {
    await db.collection('products').insertOne(req.body);
    res.sendStatus(201);
  } catch ({ message }) {
    res.status(500).send(message);
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await db.collection('products').find().toArray();
    res.send(products);
  } catch ({ message }) {
    res.status(500).send(message);
  }
};

//usada para reduzir a quantidade do stock de um produto especifico
//OBS: será chamada quando um produto é adicionado/aumentado, reduzido no carrinho e após uma compra ser feita(checkout)
export const changeStock = async (req, res) => {
  const { id } = req.params;
  const value = Number(req.params.value);

  const { error } = putProductShema.validate(value);
  if (error) return res.status(422).send(error.details.map(({ message }) => message));

  try {
    const { matchedCount } = await db.collection('products').updateOne(
      { _id : new ObjectId(id) },
      { $inc : { stock: value } }
    );
    if (matchedCount === 0) return res.status(404).send('product not found');

    res.status(202).send('changed');
  } catch ({ message }) {
    res.status(500).send(message);
  }
};
