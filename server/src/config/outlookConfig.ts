import passport from 'passport';
import { Strategy as OutlookStrategy } from 'passport-outlook';

passport.use(new OutlookStrategy({
  clientID: process.env.OUTLOOK_CLIENT_ID,
  clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
  callbackURL: process.env.OUTLOOK_REDIRECT_URI
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
