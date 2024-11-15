import { Entities, OrderStatus } from '@/common/enums';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';
import { Items } from './items.entity';
import { currentDate } from '@/common/format';

@Entity({ name: Entities.ORDERS })
export class Orders {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userId: ObjectId;

  @Column()
  total: number;

  @Column({ enum: OrderStatus })
  status: OrderStatus;

  @Column()
  items: Items[];

  @Column()
  cancellationDeadline: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  setCancellationDeadline() {
    const cancellationDeadline = currentDate;
    cancellationDeadline.setMinutes(cancellationDeadline.getMinutes() + 30);
    this.cancellationDeadline = cancellationDeadline;
  }
}
