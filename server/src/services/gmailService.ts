import { google } from 'googleapis';
import oAuth2Client from '../config/gmailConfig';

const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

export const readEmails = async () => {
  const res = await gmail.users.messages.list({
    userId: 'me',
    q: 'is:unread'
  });
  return res.data.messages || [];
};

export const getEmailDetails = async (messageId: string) => {
  const res = await gmail.users.messages.get({
    userId: 'me',
    id: messageId,
  });
  return res.data;
};

export const sendEmail = async (to: string, subject: string, message: string) => {
  const email = [
    `To: ${to}`,
    'Content-Type: text/plain; charset=utf-8',
    `Subject: ${subject}`,
    '',
    message,
  ].join('\n');
  
  const encodedEmail = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedEmail,
    },
  });
};
