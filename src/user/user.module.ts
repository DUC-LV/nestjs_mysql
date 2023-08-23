import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([User]), JwtModule.register({ secret: process.env.SECRET_KEY })],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}