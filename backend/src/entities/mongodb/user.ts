import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn, CreateDateColumn } from "typeorm";

@Entity("user")
export class UserEntity {
  @ObjectIdColumn()
  _id!: ObjectId | string;

  @Column()
  name!: string;

  // @Column()
  // email!: string;

  @Column()
  password!: string;

  @Column()
  role!: string;

  @CreateDateColumn()
  created_at!: Date;
}
