import fetch from 'node-fetch';

const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send';
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDINBLUE_API = 'https://api.sendinblue.com/v3/smtp/email';
const SENDINBLUE_API_KEY = process.env.SENDINBLUE_API_KEY;
const EMAIL_MAP = {
  welcome: {
    en: 2,
    is: 6,
  },
  verify: {
    en: 1,
    is: 5,
  },
};

export async function sendEmail(type, { name, email, lang }) {
  return await fetch(SENDINBLUE_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      'api-key': SENDINBLUE_API_KEY,
    },
    body: JSON.stringify({
      to: [
        {
          name,
          email,
        },
      ],
      templateId: EMAIL_MAP[type][lang],
      params: {
        name,
      },
    }),
  });
}
