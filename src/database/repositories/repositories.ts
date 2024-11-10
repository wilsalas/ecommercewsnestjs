import { Repository } from 'typeorm';
import { Carts, Orders, Products, Users } from '../entities';

export class UsersRepository extends Repository<Users> {}
export class ProductsRepository extends Repository<Products> {}
export class CartsRepository extends Repository<Carts> {}
export class OrdersRepository extends Repository<Orders> {}
