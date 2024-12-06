import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    HttpModule, 
    TypeOrmModule.forFeature([User, Address]), 
    forwardRef(() => AuthModule)
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
