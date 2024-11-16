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
import { Entities, Role } from '@/common/enums';

@Entity({ name: Entities.USERS })
export class Users {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column({ nullable: true })
  lastName?: string = '';

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ enum: Role })
  role?: Role = Role.USER;

  @Column()
  active?: boolean = true;

  @Column({ nullable: true })
  image?: string = '';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  setDefaults() {
    if (!this.lastName) this.lastName = '';
    if (!this.role) this.role = Role.USER;
    if (!this.active) this.active = true;
    if (!this.image) this.image = '';
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) return;
    this.password = await hash(this.password, 10);
  }
}
