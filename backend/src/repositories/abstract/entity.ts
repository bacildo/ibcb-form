import { DataSource } from "typeorm"

export function EntityRepository(dataSource: DataSource, entity: any) {
  return function <T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      dataSource = dataSource
      entity = entity
    }
  }
}