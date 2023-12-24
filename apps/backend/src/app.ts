import express from "express";
import morgan from 'morgan';

import routes from "./routes";

class App {
  public server;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(morgan('[:date[web]] :method :url :status'));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
