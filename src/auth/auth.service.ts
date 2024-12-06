import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async register(userDto: any) {
        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        const newUser = await this.userService.create({ ...userDto, password: hashedPassword });
        return newUser;
    }
}