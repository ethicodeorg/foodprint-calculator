import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { sendVerifyEmail } from '../../utils/sendEmail';

const handler = nextConnect();
handler.use(middleware);

// POST api/send-verify-email
handler.post(async (req, res) => {
  const { name, email } = req.body;
  const response = await sendVerifyEmail({ name, email });
  res.status(200).end();
});

export default handler;
