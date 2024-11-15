import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  Min,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';

export class Item {
  @ApiProperty({ default: '' })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: [Item] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Item)
  items: Item[];
}
