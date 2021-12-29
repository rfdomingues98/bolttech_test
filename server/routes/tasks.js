import { Router } from 'express';
import TasksController from '../controllers/TasksController';

const tasksRouter = Router();

tasksRouter.get('/tasks', async (req, res) => TasksController.all(req, res));

tasksRouter.get('/tasks/:id([0-9a-fA-F]{24})', async (req, res) => TasksController.get(req, res));

tasksRouter.post('/tasks', async (req, res) => TasksController.create(req, res));

tasksRouter.put('/tasks/:id([0-9a-fA-F]{24})', async (req, res) =>
  TasksController.update(req, res)
);

tasksRouter.delete('/tasks/:id([0-9a-fA-F]{24})', async (req, res) =>
  TasksController.delete(req, res)
);

export default tasksRouter;
