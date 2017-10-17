import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config';

import signIn from './server/controllers/signIn';
import registerUser from './server/controllers/registerUser';
import createGroup from './server/controllers/createGroup';
import postMessage from './server/controllers/postMessage';
import addUsers from './server/controllers/addUsers';
import getMembers from './server/controllers/getMembers';
import getGroups from './server/controllers/getGroups';
import getMessages from './server/controllers/getMessages';
import searchUsers from './server/controllers/searchUsers';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('dist/client'), express.static('template'));

app.use(
  '/api/v1',
  signIn,
  registerUser,
  createGroup,
  postMessage,
  addUsers,
  getMembers,
  getGroups,
  getMessages,
  searchUsers,
);

dotenv.config();

const DIST_DIR = path.join(__dirname, 'dist');
const compiler = webpack(config);
const isDevelopment = process.env.NODE_ENV !== 'production';
const HTML_FILE = path.join(__dirname, 'dist/client/index.html');

if (isDevelopment) {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));

  app.get('*', (request, response, next) => {
    const filename = path.join(DIST_DIR, 'client', 'index.html');

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
  app.get('*', (request, response) => response.sendFile(HTML_FILE));
}

app.listen(process.env.PORT);

export default app;
