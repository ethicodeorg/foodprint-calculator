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
    filter = { 'owner.id': user };
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

  res.status(200).json({ meals: docs.sort((a, b) => a[sortBy] - b[sortBy]) });
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

  if (user) {
    // Update all the user's meals with the new user details
    const resp = await req.db.collection('meals').updateMany(
      { 'owner.id': user._id },
      {
        $set: {
          lastModified: new Date(),
          owner: {
            id: user._id,
            name: user.name,
            type: user.type,
            homepage: user.homepage,
          },
        },
      }
    );

    return res.status(201).json({ meals: resp });
  }

  const response = await req.db.collection('meals').findOneAndUpdate(
    { _id: ObjectId(mealId) },
    {
      $set: {
        lastModified: new Date(),
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