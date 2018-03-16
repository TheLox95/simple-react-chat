import { createServer, Server as HttpServer } from 'http';
import { readFile } from 'fs';
import { join } from 'path';
import * as express from 'express';

export class Server {
  private _serverInstance: HttpServer;
  private _app = express();
  private _portNumber = 4000;

  constructor() {
    console.warn('constructor');
    
    this._serverInstance = createServer(this._app);
    this._app.use(express.static(join(__dirname, '../build')));
  }

  get instance() {
    return this._serverInstance;
  }

  listen() {
    return this._serverInstance.listen(process.env.PORT || this._portNumber, (err: string) => {
      if (err) { throw err; }
      console.warn(`listening on port ${this._portNumber}`);
    });
  }

}
