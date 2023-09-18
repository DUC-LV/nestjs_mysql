import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({ secret: process.env.SECRET_KEY, signOptions: { expiresIn: '15m' } }),
        PassportModule,
    ],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
