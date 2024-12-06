import { IsString, IsNumber, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class RatingDto {
  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @IsNumber()
  @IsNotEmpty()
  count: number;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsObject()
  @ValidateNested()
  @Type(() => RatingDto)
  rating: RatingDto;
}
