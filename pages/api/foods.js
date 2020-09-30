import nextConnect from 'next-connect';
import { ObjectId } from 'mongodb';
import middleware from '../../middlewares/middleware';

const handler = nextConnect();
handler.use(middleware);

// GET api/foods
handler.get(async (req, res) => {
  const { key } = req.query;
  let filter = {};

  if (key) {
    filter = { key: key };
  }

  try {
    const docs = await req.db.collection('foods').find(filter).toArray();

    res.status(200).json({ foods: docs });
  } catch (error) {
    console.error(error.message);

    res.status(400).end();
  }
});

// POST api/foods
handler.post(async (req, res) => {
  let { food } = req.body;
  food.createdAt = new Date();

  try {
    const response = await req.db.collection('foods').insertOne(food);

    res.status(201).json({ food: response.value });
  } catch (error) {
    console.error(error.message);

    res.status(400).end();
  }
});

// DELETE api/foods
handler.delete(async (req, res) => {
  const { foodId } = req.body;

  try {
    const response = await req.db.collection('foods').remove({ _id: ObjectId(foodId) });

    res.status(204).end();
  } catch (error) {
    console.error(error.message);

    res.status(400).end();
  }
});

export default handler;
