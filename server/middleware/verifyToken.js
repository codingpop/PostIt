import jwt from 'jsonwebtoken';

const verifyToken = (request, response, next) => {
  const token = request.headers.token;
  if (token) {
    jwt.verify(token, process.env.SECRET, (error, payload) => {
      if (error) {
        request.user = undefined;
        next();
      } else {
        request.user = payload;
        next();
      }
    });
  } else {
    request.user = undefined;
    next();
  }
};

export default verifyToken;
