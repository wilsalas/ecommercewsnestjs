import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Auth } from '@/common/decorators';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Role } from '@/common/enums';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Auth()
  @UseInterceptors(CacheInterceptor)
  @Get('/getCategories')
  async getCategories() {
    return await this.productsService.getCategories();
  }

  @Auth()
  @Get('/getProducts')
  async getProducts() {
    return await this.productsService.getProducts();
  }

  @Auth()
  @ApiParam({ name: 'id' })
  @Get('/getProductById/:id')
  async getProductById(@Param('id') id: string) {
    return await this.productsService.getProductById(id);
  }

  @Auth(Role.ADMIN)
  @Post('/create')
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @Auth(Role.ADMIN)
  @ApiParam({ name: 'id' })
  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.update(id, updateProductDto);
  }

  @Auth(Role.ADMIN)
  @ApiParam({ name: 'id' })
  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    return await this.productsService.delete(id);
  }
}
