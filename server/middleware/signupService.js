import { User } from '../models/User';

const checkForDuplicateUser = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username }).exec();
  if (user) return res.status(409).send({ error: true, message: 'Username already in use.' });
  next();
};

export default checkForDuplicateUser;
