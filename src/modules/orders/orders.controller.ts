import { Auth, RequestUser } from '@/common/decorators';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { IRequestUser } from '@/common/interfaces';
import { Role } from '@/common/enums';
import { CreateOrderDto } from './dto';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Auth(Role.ADMIN)
  @Get('/getOrders')
  async getOrders() {
    return await this.ordersService.getOrders();
  }

  @Auth()
  @Get('/getOrdersById')
  async getOrdersById(@RequestUser() requestUser: IRequestUser) {
    return await this.ordersService.getOrdersById(requestUser.sub);
  }

  @Auth()
  @Post('/create')
  async create(
    @RequestUser() requestUser: IRequestUser,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return await this.ordersService.create(requestUser.sub, createOrderDto);
  }

  @Auth()
  @ApiParam({ name: 'id' })
  @Put('/cancelOrder/:id')
  async cancelOrder(@Param('id') id: string) {
    return await this.ordersService.cancelOrder(id);
  }
}
