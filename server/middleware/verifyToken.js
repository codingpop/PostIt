import jwt from 'jsonwebtoken';

const verifyToken = (request, response, next) => {
  const token = request.headers.token;
  request.user = undefined;
  if (token) {
    jwt.verify(token, process.env.SECRET, (error, payload) => {
      if (error) {
        response.json({
          message: 'Invalid token'
        });
      } else {
        request.user = payload;
        next();
      }
    });
  } else {
    response.json({
      message: 'You are not logged in'
    });
  }
};

export default verifyToken;
