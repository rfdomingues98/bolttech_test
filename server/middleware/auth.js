import jwt from 'jsonwebtoken';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).json({ message: 'You are not logged in!' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verified.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized!' });
  }
};

const decodeToken = async (token) => {
  const data = await jwt_decode(token);
  return data;
};

export { verifyToken, decodeToken };
