import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entitiy';
import { Rating } from './entities/rating.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Product, Rating]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
