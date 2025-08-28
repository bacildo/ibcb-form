import "reflect-metadata";
import { Service } from "typedi";
import { DataSource } from "typeorm";
import { databaseEnabled, mongoOptions } from "../config";

@Service()
export class Database {
  private static dataSourceMongo: DataSource | null = null;

  async connectMongo(): Promise<void> {
    if (!databaseEnabled.mongoOptions) return;

    if (!Database.dataSourceMongo) {
      Database.dataSourceMongo = new DataSource(mongoOptions);
    }

    if (!Database.dataSourceMongo.isInitialized) {
      try {
        await Database.dataSourceMongo.initialize();
        console.log(
          "Entities loaded:",
          Database.dataSourceMongo.entityMetadatas.map(m => m.name)
        );
        const { type, database } = mongoOptions as any;
        console.log("Successfully Connected!", type, database);
      } catch (error) {
        const { type } = mongoOptions as any;
        console.error("Connection Failed!", type, error);
        throw error;
      }
    }
  }

  public static get mongo(): DataSource {
    if (!Database.dataSourceMongo || !Database.dataSourceMongo.isInitialized) {
      throw new Error("Mongo DataSource not initialized. Call connectMongo() first.");
    }
    return Database.dataSourceMongo;
  }

  public get mongoIsInitialized(): boolean {
    return !!Database.dataSourceMongo?.isInitialized;
  }
}
