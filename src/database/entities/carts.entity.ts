import { Entities } from '@/common/enums';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';
import { Items } from './items.entity';

@Entity({ name: Entities.Carts })
export class Carts {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ name: 'user_id' })
  userId: ObjectId;

  @Column(() => Items)
  items: Array<Items>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
