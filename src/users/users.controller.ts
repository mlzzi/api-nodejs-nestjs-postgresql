import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findUserById(@Param('id') id: string) {
        return this.userService.findById(+id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Patch(':id')
    //@UseGuards(JwtAuthGuard)
    updateUser(@Param('id') id: number, @Body() createUserDto: Partial<CreateUserDto>) {
        return this.userService.update(id, createUserDto);
    }

    @Delete(':id')
    //@UseGuards(JwtAuthGuard)
    deleteUserById(@Param('id') id: string) {
        return this.userService.deleteById(+id);
    }
}
