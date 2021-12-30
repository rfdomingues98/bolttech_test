import jwt from 'jsonwebtoken';
import { User } from '../models/User';

class UserController {
  get = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await User.findById(id).exec();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  all = async (req, res) => {
    try {
      const result = await User.find({}).exec();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  delete = async (req, res) => {
    const _id = req.params.id;
    try {
      const result = User.findOneAndDelete({ _id }).exec();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  signup = async (req, res) => {
    const { username, password } = req.body;
    try {
      const result = User.create({ username, password });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  signin = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username }, { __v: false }).exec();
      if (!user) return res.status(404).send({ error: true, message: 'User not found.' });
      const match = await user.comparePassword(password);
      if (!match) {
        return res.status(401).send({ error: true, message: 'Incorrect password.' });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 86400 });
      const data = { token, user: { id: user._id, username } };
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  };
}

export default new UserController();
