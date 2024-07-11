import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn, CreateDateColumn } from "typeorm";

@Entity("user")
export class UserEntity {
  @ObjectIdColumn()
  _id!: ObjectId | string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  role!: string;

  @CreateDateColumn()
  created_at!: Date;
}
