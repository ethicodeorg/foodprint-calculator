import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/apiHelpers';

/**
 * Async filter function for filtering users with some public meals
 * https://advancedweb.hu/how-to-use-async-functions-with-array-filter-in-javascript/
 * @param {Array} users
 * @param {Function} predicate
 * @returns {Array} the filtered result
 */
const asyncFilter = async (users, predicate) => {
  const results = await Promise.all(users.map(predicate));

  return users.filter((_v, index) => results[index]);
};

const handler = nextConnect();

handler.use(middleware);

// GET /api/users
handler.get(async (req, res) => {
  const query = req.query;
  let filter = {};

  if (query.user) {
    filter._id = query.user;
  }

  const users = await req.db.collection('users').find().toArray();

  // Only return users that have some public meals
  const usersWithPublicMeals = await asyncFilter(users, async (user) => {
    const mealFilter = {
      'owner.id': user._id.toString(),
      visibility: 'public',
    };
    const docs = await req.db.collection('meals').find(mealFilter).toArray();

    return docs.length;
  });

  res.status(200).json({ users: usersWithPublicMeals });
});

// POST /api/users
handler.post(async (req, res) => {
  const { name, password, retypedPassword, type, subscription } = req.body;
  const email = normalizeEmail(req.body.email); // this is to handle things like jane.doe@gmail.com and janedoe@gmail.com being the same

  if (!isEmail(email)) {
    res.status(400).send('The email you entered is invalid.');
    return;
  }

  if (!password || !name || !type) {
    res.status(400).send('Missing field(s).');
    return;
  }

  if (password !== retypedPassword) {
    res.status(400).send('The password and retyped password did not match.');
    return;
  }

  // check if email existed
  if ((await req.db.collection('users').countDocuments({ email })) > 0) {
    res.status(403).send('The email has already been used.');
    return;
  }

  // check if name existed
  if ((await req.db.collection('users').countDocuments({ name })) > 0) {
    res.status(403).send('The name has already been used.');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await req.db
    .collection('users')
    .insertOne({
      email,
      password: hashedPassword,
      name,
      type,
      subscription,
      createdAt: new Date(),
    })
    .then(({ ops }) => ops[0]);

  req.logIn(user, (err) => {
    if (err) throw err;
    // when we finally log in, return the (filtered) user object
    res.status(201).json({
      user: extractUser(req.user),
    });
  });
});

// PUT /api/users
handler.put(async (req, res) => {
  // TODO: If the user updated his username, we have to change the owner property in all his meals.
  const updatedUser = req.body;
  const setObj = {
    lastModified: new Date(),
  };

  if (updatedUser.name) {
    // Check if name existed
    if ((await req.db.collection('users').countDocuments({ name: updatedUser.name })) > 0) {
      res.status(403).send('The name has already been used.');
      return;
    }

    setObj.name = updatedUser.name;
  }

  if (updatedUser.type) {
    setObj.type = updatedUser.type;
  }

  if (updatedUser.homepage) {
    setObj.homepage = updatedUser.homepage;
  }

  const response = await req.db.collection('users').findOneAndUpdate(
    { _id: ObjectId(updatedUser._id) },
    {
      $set: setObj,
    },
    {
      upsert: true,
      returnOriginal: false,
    }
  );

  res.status(201).json({ user: extractUser(response.value) });
});

export default handler;
