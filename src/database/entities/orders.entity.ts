import { Entities, OrderStatus } from '@/common/enums';
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

@Entity({ name: Entities.ORDERS })
export class Orders {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ name: 'user_id' })
  userId: ObjectId;

  @Column()
  total: number;

  @Column({ enum: OrderStatus })
  status: OrderStatus;

  @Column()
  items: Items[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
