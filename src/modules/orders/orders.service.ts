import { Orders } from '@/database/entities';
import { OrdersRepository } from '@/database/repositories';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { CreateOrderDto } from './dto';
import { ProductsService } from '../products/products.service';
import { OrderStatus } from '@/common/enums';
import { currentDate } from '@/common/format';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders) private ordersRepository: OrdersRepository,
    private productsService: ProductsService,
  ) {}

  async getOrders(): Promise<Orders[]> {
    return await this.ordersRepository.find();
  }

  async getOrderById(id: string): Promise<Orders> {
    const notFoundError = new NotFoundException('Order not found');
    if (!ObjectId.isValid(id)) throw notFoundError;
    const order = await this.ordersRepository.findOne({
      where: { _id: new ObjectId(id) },
      select: ['status', 'cancellationDeadline'],
    });
    if (!order) throw notFoundError;
    return order;
  }

  async getOrdersById(id: string): Promise<Orders[]> {
    if (!ObjectId.isValid(id)) return [];
    return await this.ordersRepository.find({
      where: { userId: new ObjectId(id) },
    });
  }

  async create(id: string, createOrderDto: CreateOrderDto): Promise<string> {
    try {
      const items = await Promise.all(
        createOrderDto.items.map(async (item) => {
          const product = await this.productsService.getProductById(
            item.productId,
          );
          return { product, quantity: item.quantity };
        }),
      );
      const total =
        Math.round(
          items.reduce((accum, current) => {
            return accum + current.product.price * current.quantity;
          }, 0) * 100,
        ) / 100;
      const newOrder = this.ordersRepository.create({
        userId: new ObjectId(id),
        total,
        status: OrderStatus.PENDING,
        items,
      });
      await this.ordersRepository.save(newOrder);
      return 'Order created success!';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async cancelOrder(id: string): Promise<string> {
    const order = await this.getOrderById(id);
    try {
      if (order.status === OrderStatus.COMPLETED) {
        throw 'Cannot cancel a completed order';
      }
      if (order.status === OrderStatus.CANCELED) {
        throw 'The order has already been cancelled';
      }
      if (order.cancellationDeadline.getTime() < currentDate.getTime()) {
        throw 'The cancellation deadline has passed';
      }
      const orderCanceled = Object.assign(order, {
        status: OrderStatus.CANCELED,
      });
      await this.ordersRepository.save(orderCanceled);
      return 'Order canceled success!';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async completeOrder(): Promise<void> {
    try {
      await this.ordersRepository.update(
        { status: OrderStatus.PENDING },
        { status: OrderStatus.COMPLETED },
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
