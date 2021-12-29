import { Task } from '../models/Task';
import { Project } from '../models/Project';
import { decodeToken } from '../middleware/auth';

class TasksController {
  get = async (req, res) => {
    const token = req.headers['x-access-token'];
    const data = await decodeToken(token);
    const { id } = req.params;
    try {
      const result = await Task.find({ _id: id, owner: data.id }).exec();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  all = async (req, res) => {
    const token = req.headers['x-access-token'];
    const data = await decodeToken(token);
    try {
      const result = await Task.find({ owner: data.id }).exec();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  create = async (req, res) => {
    const { description, projectId } = req.body;
    try {
      const task = await Task.create({ description, project: projectId });
      await Project.findByIdAndUpdate(
        projectId,
        { $push: { tasks: task } },
        { new: true, useFindAndModify: false }
      );
      return res.status(200).json(task);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  update = async (req, res) => {
    const _id = req.params.id;
    const { finished } = req.body;
    try {
      const result = await Task.findOneAndUpdate({ _id, finished: false }, { finished });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  delete = async (req, res) => {
    const _id = req.params.id;
    try {
      const result = await Task.findOne({ _id, finished: false }).exec();
      await Project.findByIdAndUpdate(
        result.project,
        { $pull: { tasks: _id } },
        { new: true, useFindAndModify: false }
      );
      await result.deleteOne();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  };
}

export default new TasksController();
