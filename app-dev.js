import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config';
import userRoutes from './server/routes/userRoutes';
import groupRoutes from './server/routes/groupRoutes';

dotenv.config();
const app = express();
const DIST_DIR = path.join(__dirname, 'dist');
const compiler = webpack(config);
const isDevelopment = process.env.NODE_ENV !== 'production';
const HTML_FILE = path.join(__dirname, 'dist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(`${DIST_DIR}/client/assets`));

app.use('api/v1', userRoutes);
app.use('api/v1', groupRoutes);

if (isDevelopment) {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));

  app.get('/', (request, response, next) => {
    const filename = path.join(DIST_DIR, 'index.html');

    compiler.outputFileSystem.readFile(filename, (error, result) => {
      if (error) {
        next(error);
      }
      response.set('content-type', 'text/html');
      response.send(result);
      response.end();
    });
  });
} else {
  app.use(express.static(DIST_DIR));

  app.get('/', (request, response) => response.sendFile(HTML_FILE));
}

app.listen(process.env.PORT);

export default app;
