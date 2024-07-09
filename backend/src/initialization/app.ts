import "reflect-metadata";
import { Database, Server } from "./index";

export class App {
  private server = new Server();
  private databaseMongo = new Database();

  async appInitialize(): Promise<Server> {
    await this.databaseMongo.connectMongo();
    setTimeout(() => {
      this.server.init();
      this.server.start();
    }, 1500);

    return this.server;
  }
}
