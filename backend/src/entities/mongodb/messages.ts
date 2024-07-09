import {
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  ObjectIdColumn,
} from "typeorm";
import { UserEntity } from "./user";
import { ObjectId } from "mongodb";

@Entity("messages")
export class MessageEntity {
  @ObjectIdColumn()
  _id!: ObjectId | string;

  @Column()
  name!: string;

  @Column()
  recipient!: string;

  @Column()
  message!: string;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: "userId", referencedColumnName: "_id" })
  user!: UserEntity | string;

  @Column()
  userId!: ObjectId | string;

  @CreateDateColumn()
  created_at!: Date;
}
