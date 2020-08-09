import fetch from 'node-fetch';

const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send';
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDINBLUE_API = 'https://api.sendinblue.com/v3/smtp/email';
const SENDINBLUE_API_KEY = process.env.SENDINBLUE_API_KEY;

export async function sendVerifyEmail({ name, email }) {
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
      templateId: 1,
      params: {
        name,
      },
    }),
  });
}

export async function sendWelcomeEmail({ name, email }) {
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
      templateId: 2,
      params: {
        name,
      },
    }),
  });
}
