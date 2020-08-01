import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { sendWelcomeEmail } from '../../utils/sendEmail';

const handler = nextConnect();
handler.use(middleware);

// POST api/send-welcome-email
handler.post(async (req, res) => {
  const { name, email } = req.body;
  const response = await sendWelcomeEmail({ name, email });
  res.status(200).end();
});

export default handler;
