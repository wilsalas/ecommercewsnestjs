import { Repository } from 'typeorm';
import { Users, Products, Orders } from '../entities';

export class UsersRepository extends Repository<Users> {}
export class ProductsRepository extends Repository<Products> {}
export class OrdersRepository extends Repository<Orders> {}
