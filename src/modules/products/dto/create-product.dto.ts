import { ProductCategory } from '@/common/enums';
import { ApiProperty } from '@nestjs/swagger';
import {
  Min,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ default: '' })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  name: string;

  @ApiProperty({ default: '' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  description: string;

  @ApiProperty({ default: '' })
  @IsNotEmpty()
  @IsNumber()
  @Min(10)
  price: number;

  @ApiProperty({ default: '' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  stock: number;

  @ApiProperty({ enum: ProductCategory })
  @IsNotEmpty()
  @IsEnum(ProductCategory)
  category: ProductCategory;
}
