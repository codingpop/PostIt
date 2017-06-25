import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import dotenv from 'dotenv';


import userRoutes from './routes/userRoutes';
import groupRoutes from './routes/groupRoutes';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use('/api', userRoutes);
app.use('/api', groupRoutes);

app.listen(process.env.PORT);

export default app;
