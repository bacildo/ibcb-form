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
  protected constructor(
    private readonly dataSource: DataSource,
    private readonly entity: ObjectType<T>
  ) {}

  protected get mySqlRepository(): Repository<T> {
    return this.dataSource.getRepository(this.entity);
  }

  protected get mongoRepository(): MongoRepository<T> {
    return this.dataSource.getMongoRepository(this.entity);
  }

  protected get manager(): EntityManager {
    return this.dataSource.manager;
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

    if (entity) this.mySqlRepository.remove(entity);
  }
}
