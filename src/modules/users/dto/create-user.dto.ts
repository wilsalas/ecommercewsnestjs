import { REGEX } from '@/common/enums';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ default: '' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ default: '' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ default: '' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ default: '' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(REGEX.PASSWORD)
  password: string;

  @ApiProperty({ default: '' })
  @IsOptional()
  @IsString()
  image?: string;
}
