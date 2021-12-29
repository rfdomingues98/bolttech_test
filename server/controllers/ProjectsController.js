import { Project } from '../models/Project';
import { decodeToken } from '../middleware/auth';

class ProjectsController {
  get = async (req, res) => {
    const token = req.headers['x-access-token'];
    const data = await decodeToken(token);
    const { id } = req.params;
    try {
      const result = Project.findOne({ _id: id, owner: data.id })
        .populate('tasks', '-project -__v')
        .exec();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  all = async (req, res) => {
    const token = req.headers['x-access-token'];
    const data = await decodeToken(token);
    try {
      const result = await Project.find({ owner: data.id })
        .populate('tasks', '-project -__v')
        .exec();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  create = async (req, res) => {
    const token = req.headers['x-access-token'];
    const data = await decodeToken(token);
    const { name } = req.body;
    try {
      const result = await Project.create({ name, owner: data.id });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  update = async (req, res) => {
    const token = req.headers['x-access-token'];
    const data = await decodeToken(token);
    const { _id } = req.params;
    const { name } = req.body;
    try {
      const result = await Project.findOneAndUpdate({ _id, owner: data.id }, { name });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  delete = async (req, res) => {
    const token = req.headers['x-access-token'];
    const data = await decodeToken(token);
    const { id } = req.params;
    try {
      const result = await Project.findOne({ _id: id, owner: data.id }).exec();
      await result.deleteOne();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  clearTasks = async (req, res) => {
    const token = req.headers['x-access-token'];
    const data = await decodeToken(token);
    const { id } = req.params;
    try {
      const result = await Project.findOneAndUpdate(
        { _id: id, owner: data.id },
        { $set: { tasks: [] } },
        { new: true }
      );

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  };
}

export default new ProjectsController();
