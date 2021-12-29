import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import Database from './database/db';

import router from './routes';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.db = new Database();
    this.config();
  }

  config = () => {
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(router);
    this.db.connect();
  };
}

const { app } = new App();

export default app;
