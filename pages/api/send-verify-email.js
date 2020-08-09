import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { sendVerifyEmail } from '../../utils/sendEmail';

const handler = nextConnect();
handler.use(middleware);

// POST api/send-verify-email
handler.post(async (req, res) => {
  const { name, email } = req.body;

  try {
    const response = await sendVerifyEmail({ name, email });

    if (response.status === 201) {
      return res.status(201).end();
    }
    res.status(400).end();
  } catch (error) {
    console.error(error.message);
    res.status(400).end();
  }
});

export default handler;
