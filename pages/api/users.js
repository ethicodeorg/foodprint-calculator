import nextConnect from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import bcrypt from 'bcryptjs';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/apiHelpers';

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

  res.status(200).json({ users });
});

// POST /api/users
handler.post(async (req, res) => {
  const { name, password, type, visibility, subscription } = req.body;
  const email = normalizeEmail(req.body.email); // this is to handle things like jane.doe@gmail.com and janedoe@gmail.com being the same

  if (!isEmail(email)) {
    res.status(400).send('The email you entered is invalid.');
    return;
  }

  if (!password || !name) {
    res.status(400).send('Missing field(s)');
    return;
  }

  // check if email existed
  if ((await req.db.collection('users').countDocuments({ email })) > 0) {
    res.status(403).send('The email has already been used.');
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
      visibility,
      subscription,
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
  const response = await req.db.collection('users').findOneAndUpdate(
    { _id: ObjectId(updatedUser._id) },
    {
      $set: {
        visibility: updatedUser.visibility || 'private',
        name: updatedUser.name || '',
        type: updatedUser.type || 'other',
        subscription: updatedUser.subscription || 'free',
      },
    },
    {
      upsert: true,
      returnOriginal: false,
    }
  );

  res.status(201).json({ user: extractUser(response.value) });
});

export default handler;
