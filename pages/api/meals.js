import nextConnect from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/apiHelpers';
import { ObjectId } from 'mongodb';

const handler = nextConnect();
handler.use(middleware);

// GET api/meals
handler.get(async (req, res) => {
  console.log(process.env.MONGODB_URI);
  console.log(process.env.DB_NAME);
  const query = req.query;
  let filter = {};

  if (query.user) {
    filter = { 'owner.id': query.user };
  }

  if (query.id) {
    filter = { _id: ObjectId(query.id) };
  }

  if (query.visibility) {
    filter.visibility = query.visibility;
  }

  const docs = await req.db.collection('meals').find(filter).toArray();

  res.status(200).json({ meals: docs });
});

// POST api/meals
handler.post(async (req, res) => {
  const { meal } = req.body;

  const response = await req.db.collection('meals').insertOne(meal);

  res.status(201).json({ meal: response.value });
});

// PUT api/meals
handler.put(async (req, res) => {
  const { mealId, meal } = req.body;
  const response = await req.db.collection('meals').findOneAndUpdate(
    { _id: ObjectId(mealId) },
    {
      $set: {
        visibility: meal.visibility,
        owner: meal.owner,
        title: meal.title,
        about: meal.about,
        link: meal.link,
        numberOfServings: meal.numberOfServings,
        landUse: meal.landUse,
        ghgEmissions: meal.ghgEmissions,
        waterWithdrawals: meal.waterWithdrawals,
        eutrophyingEmissions: meal.eutrophyingEmissions,
        ingredients: meal.ingredients,
      },
    },
    {
      upsert: true,
      returnOriginal: false,
    }
  );

  res.status(201).json({ meal: response.value });
});

// DELETE api/meals
handler.delete(async (req, res) => {
  const { mealId, userId } = req.body;
  const response = await req.db
    .collection('meals')
    .remove({ _id: ObjectId(mealId), 'owner.id': userId });
});

export default handler;
