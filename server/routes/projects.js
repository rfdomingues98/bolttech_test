import { Router } from 'express';
import ProjectsController from '../controllers/ProjectsController';
import { verifyToken } from '../middleware/auth';

const projectsRouter = Router();

projectsRouter.get('/projects', verifyToken, async (req, res) => ProjectsController.all(req, res));

projectsRouter.get('/projects/:id([0-9a-fA-F]{24})', verifyToken, async (req, res) =>
  ProjectsController.get(req, res)
);

projectsRouter.post('/projects', verifyToken, async (req, res) =>
  ProjectsController.create(req, res)
);

projectsRouter.put('/projects/:id([0-9a-fA-F]{24})', verifyToken, async (req, res) =>
  ProjectsController.update(req, res)
);

projectsRouter.delete('/projects/:id([0-9a-fA-F]{24})', verifyToken, async (req, res) =>
  ProjectsController.delete(req, res)
);

projectsRouter.delete('/projects/:id([0-9a-fA-F]{24})/tasks', verifyToken, async (req, res) =>
  ProjectsController.clearTasks(req, res)
);

export default projectsRouter;
