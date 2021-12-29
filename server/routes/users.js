import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import verifySignup from '../middleware/signupService';

const usersRouter = Router();

usersRouter.get('/users', (req, res) => UsersController.all(req, res));

usersRouter.get('/users/:id([0-9a-fA-F]{24})', (req, res) => UsersController.get(req, res));

usersRouter.post('/users', (req, res) => UsersController.create(req, res));

usersRouter.delete('/users/:id([0-9a-fA-F]{24})', (req, res) => UsersController.delete(req, res));

usersRouter.post('/users/signin', (req, res) => UsersController.signin(req, res));

usersRouter.post('/users/signup', verifySignup, (req, res) => UsersController.signup(req, res));

export default usersRouter;
