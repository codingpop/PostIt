import jwt from 'jsonwebtoken';

const authenticate = (request, response, next) => {
  const token = request.headers.token;
  if (token) {
    jwt.verify(token, process.env.SECRET, (error, userData) => {
      if (error) {
        request.user = undefined;
      } else {
        request.user = userData;
        next();
      }
    });
  } else {
    request.user = undefined;
  }
};

export default authenticate;
