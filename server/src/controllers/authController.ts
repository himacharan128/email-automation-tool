import { Request, Response } from 'express';
import oAuth2Client from '../config/gmailConfig';
import passport from 'passport';

// Google 
export const googleAuth = (req: Request, res: Response) => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.readonly'],
  });
  res.redirect(url);
};

export const googleAuthCallback = (req: Request, res: Response) => {
  const code = req.query.code as string;
  oAuth2Client.getToken(code, (err, token) => {
    if (err) return res.status(400).json({ error: 'Error retrieving access token' });
    oAuth2Client.setCredentials(token!);
    res.json({ token });
  });
};

// Outlook
export const outlookAuth = passport.authenticate('outlook');

export const outlookAuthCallback = passport.authenticate('outlook', {
  successRedirect: '/success',
  failureRedirect: '/failure',
});
