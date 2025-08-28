import { Service } from "typedi";
import {
  DataSource,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  MongoRepository,
  ObjectLiteral,
  ObjectType,
  Repository,
  SelectQueryBuilder,
} from "typeorm";

@Service()
export abstract class Abstract<T extends ObjectLiteral> {
  protected constructor(private readonly dataSource: DataSource, private readonly entity: ObjectType<T>) {}

  // ---------- REPOSITORIES ----------
  // MySQL
  protected get mySqlRepository(): Repository<T> {
    this.ensureInitialized();
    return this.dataSource.getRepository(this.entity);
  }

  // MongoDB (o que você usa)
  protected get mongoRepository(): MongoRepository<T> {
    this.ensureInitialized();
    return this.dataSource.getMongoRepository(this.entity);
  }

  protected get manager(): EntityManager {
    this.ensureInitialized();
    return this.dataSource.manager;
  }

  // ---------- HELPERS ----------
  private ensureInitialized() {
    if (!this.dataSource?.isInitialized) {
      throw new Error("DataSource not initialized. Call Database.connectMongo() before using repositories.");
    }
  }

  /*** MySql Only ***/
  protected createQuery(alias?: string): SelectQueryBuilder<T> {
    return this.mySqlRepository.createQueryBuilder(alias);
  }

  /*** MySql Only ***/
  protected save(entity: T): Promise<T> {
    return this.mySqlRepository.save(entity);
  }

  /*** MySql Only ***/
  protected find(options?: FindManyOptions): Promise<T[]> {
    return this.mySqlRepository.find(options);
  }

  /*** MySql Only ***/
  protected findOne(options: FindOneOptions): Promise<T | null> {
    return this.mySqlRepository.findOne(options);
  }

  /*** MySql Only ***/
  protected async remove(options: FindOneOptions): Promise<void> {
    const entity = await this.findOne(options);
    if (entity) await this.mySqlRepository.remove(entity);
  }
}
