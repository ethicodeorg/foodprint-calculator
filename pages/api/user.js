import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/apiHelpers';

const handler = nextConnect();

handler.use(middleware);

// GET /api/user (get current user)
handler.get(async (req, res) => {
  return res.json({ user: extractUser(req.user) });
});

export default handler;
