import "reflect-metadata";
import { Database, Server } from "./index";
import { seedAdmin } from "./seed";

export class App {
  private server = new Server();
  private databaseMongo = new Database();

  async appInitialize() {
    // 1) Sobe DB e aguarda
    await this.databaseMongo.connectMongo();

    // 2) Seed (usa a mesma DataSource inicializada)
    await seedAdmin();

    // 3) Sobe o server 
    this.server.init();
    this.server.start();

    return this.server;
  }
}
