import express from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import './config/outlookConfig';

dotenv.config();

const app = express();

app.use(express.json());
app.use(session({ secret: 'ytqvdgwevytcvwgevctqw', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', authRoutes);

export default app;
