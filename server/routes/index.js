import { Router } from 'express';
import usersRouter from './users';
import tasksRouter from './tasks';
import projectsRouter from './projects';

const router = Router();

router.use('/', usersRouter);
router.use('/', tasksRouter);
router.use('/', projectsRouter);

export default router;
