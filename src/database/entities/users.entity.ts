import {
  Column,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { ObjectId } from 'mongodb';
import { Exclude } from 'class-transformer';
import { hash } from 'bcrypt';
import { Entities, Roles } from '@/common/enums';

@Entity({ name: Entities.USERS })
export class Users {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column({ nullable: true, default: '' })
  lastName?: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ enum: Roles, default: Roles.USER })
  role: Roles;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true, default: '' })
  image?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) return;
    this.password = await hash(this.password, 10);
  }
}
