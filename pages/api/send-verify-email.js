import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { sendEmail } from '../../utils/sendEmail';

const handler = nextConnect();
handler.use(middleware);

// POST api/send-verify-email
handler.post(async (req, res) => {
  const { name, email, lang } = req.body;

  try {
    const response = await sendEmail('verify', { name, email, lang });

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
