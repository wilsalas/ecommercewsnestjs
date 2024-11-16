import { ProductCategory } from '@/common/enums';
import { Products } from '@/database/entities';
import { ProductsRepository } from '@/database/repositories';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private productsRepository: ProductsRepository,
  ) {}

  async getCategories(): Promise<ProductCategory[]> {
    return Object.values(ProductCategory);
  }

  async getProducts(): Promise<Products[]> {
    return await this.productsRepository.find();
  }

  async getProductById(id: string): Promise<Products> {
    const notFoundError = new NotFoundException('Product not found');
    if (!ObjectId.isValid(id)) throw notFoundError;
    const product = await this.productsRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    if (!product) throw notFoundError;
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<string> {
    try {
      const productFound = await this.productsRepository.findOne({
        where: { name: createProductDto.name },
        select: ['name'],
      });
      if (productFound)
        throw new ConflictException(
          `The Product ${createProductDto.name} already exists`,
        );
      const newProduct = this.productsRepository.create(createProductDto);
      await this.productsRepository.save(newProduct);
      return 'Product created success!';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<string> {
    const product = await this.getProductById(id);
    try {
      const userUpdated = Object.assign(product, updateProductDto);
      await this.productsRepository.save(userUpdated);
      return 'Product updated success!';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(id: string): Promise<string> {
    const product = await this.getProductById(id);
    try {
      await this.productsRepository.remove(product);
      return 'Product deleted success!';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
