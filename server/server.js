import app from './app';

class Server {
  port = parseInt(process.env.PORT, 10) || 3000;

  app = app;

  constructor() {
    this.app.set('port', this.port);
    this.app.listen(this.port, () => {
      console.log(`🚀 API running on port ${this.port}.`);
    });
  }
}

export default new Server();
