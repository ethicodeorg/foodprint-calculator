import fetch from 'node-fetch';

const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send';
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

export async function sendVerifyEmail({ name, email }) {
  return await fetch(SENDGRID_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email,
            },
          ],
          dynamic_template_data: {
            username: name,
          },
        },
      ],
      template_id: 'd-0c74164eded341298fce330f52e3ddb4',
      from: {
        email: 'noreply@foodprintcalculator.com',
        name: 'Foodprint Calculator',
      },
    }),
  });
}

export async function sendWelcomeEmail({ name, email }) {
  return await fetch(SENDGRID_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email,
            },
          ],
          dynamic_template_data: {
            username: name,
          },
        },
      ],
      template_id: 'd-854a7010de444d73b8c15bafa6065607',
      from: {
        email: 'noreply@foodprintcalculator.com',
        name: 'Foodprint Calculator',
      },
    }),
  });
}
