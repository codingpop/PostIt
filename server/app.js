import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

import userRoutes from './routes/userRoutes';
import groupRoutes from './routes/groupRoutes';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'dui8w9837@##&*(#&(*#*(@bdhdfAJKHKJHJAHJ',
  resave: false,
  saveUninitialized: true
}));

app.use('/api', userRoutes);
app.use('/api', groupRoutes);

app.listen(port);
