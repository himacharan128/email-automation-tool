import passport from 'passport';
import { Strategy as OutlookStrategy } from 'passport-outlook';
import { Request, Response } from 'express';
import axios from 'axios';

passport.use(new OutlookStrategy({
  clientID: process.env.OUTLOOK_CLIENT_ID,
  clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
  callbackURL: process.env.OUTLOOK_REDIRECT_URI
}, (accessToken, refreshToken, profile, done) => {
  return done(null, { accessToken, profile });
}));

export const readOutlookEmails = async (accessToken: string) => {
  const res = await axios.get('https://graph.microsoft.com/v1.0/me/mailFolders/inbox/messages', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res.data.value || [];
};

export const sendOutlookEmail = async (accessToken: string, to: string, subject: string, message: string) => {
  const email = {
    message: {
      subject: subject,
      body: {
        contentType: 'Text',
        content: message,
      },
      toRecipients: [
        {
          emailAddress: {
            address: to,
          },
        },
      ],
    },
    saveToSentItems: 'true',
  };
  
  await axios.post('https://graph.microsoft.com/v1.0/me/sendMail', email, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  });
};
