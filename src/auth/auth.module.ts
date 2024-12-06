import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalStrategy } from './local.strategy';

@Module({
  imports:[
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: 'aSecuredPassword',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtStrategy,
    LocalStrategy
  ],
  exports: [AuthService],
})
export class AuthModule {}
