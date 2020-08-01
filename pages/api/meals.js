import nextConnect from 'next-connect';
import { ObjectId } from 'mongodb';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/apiHelpers';

const handler = nextConnect();
handler.use(middleware);

// GET api/meals
handler.get(async (req, res) => {
  const { user, id, visibility, title, sortBy = 'landUse' } = req.query;
  let filter = {};

  if (user && user !== 'all') {
    filter = { ownerId: user };
  }

  if (id) {
    filter = { _id: ObjectId(id) };
  }

  if (visibility) {
    filter.visibility = visibility;
  }

  if (title) {
    filter.title = title;
  }

  const docs = await req.db.collection('meals').find(filter).toArray();

  // Add user info to the meal object for the client
  const mealsWithUserInfo = await Promise.all(
    docs.map(async (doc) => {
      const userDocs = await req.db
        .collection('users')
        .find({ _id: ObjectId(doc.ownerId) })
        .toArray();
      doc.user = extractUser(userDocs[0]);

      return doc;
    })
  );

  res.status(200).json({ meals: mealsWithUserInfo.sort((a, b) => a[sortBy] - b[sortBy]) });
});

// POST api/meals
handler.post(async (req, res) => {
  let { meal } = req.body;
  meal.createdAt = new Date();

  const response = await req.db.collection('meals').insertOne(meal);

  res.status(201).json({ meal: response.value });
});

// PUT api/meals
handler.put(async (req, res) => {
  const { mealId, meal, user } = req.body;

  const response = await req.db.collection('meals').findOneAndUpdate(
    { _id: ObjectId(mealId) },
    {
      $set: {
        lastModified: new Date(),
        visibility: meal.visibility,
        ownerId: meal.ownerId,
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
    .remove({ _id: ObjectId(mealId), ownerId: userId });

  res.status(204).end();
});

export default handler;
