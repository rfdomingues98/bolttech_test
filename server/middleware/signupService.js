import { User } from '../models/User';

const checkForDuplicateUser = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username }).exec();
  if (user) return res.status(400).json({ message: 'Username already in use.' });
  next();
};

export default checkForDuplicateUser;
