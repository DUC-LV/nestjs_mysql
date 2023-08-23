import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

// type RegisterType = {
//     email: string;
//     password: string;
//     username: string;
// };

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userService: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async register(email: string, password: string, username: string) {
        try {
            const alreadyExitsUser = await this.userService.findOne({
                where: { email },
            });

            if (alreadyExitsUser) {
                return {
                    errorCode: 409,
                    message: 'Email already exits',
                    data: null,
                };
            }

            const newUser = await this.userService.save({
                email,
                password,
                username,
            });

            if (newUser) {
                return {
                    errorCode: 200,
                    message: 'Thanks for register',
                    data: null,
                };
            }
        } catch (error) {
            console.log(error);
        }
    }

    async login(email: string, password: string) {
        try {
            const userWithEmail = await this.userService.findOne({ where: { email, password } });

            if (!userWithEmail) {
                return {
                    errorCode: 400,
                    message: '',
                    data: null,
                };
            }

            // const accessToken = await this.jwtService.signAsync(
            //     { email: (await userWithEmail).email },
            //     { secret: process.env.SECRET_KEY }
            // );
            const accessToken = await Promise.all([
                this.jwtService.signAsync(
                    { email: (await userWithEmail).email, id: (await userWithEmail).id },
                    { secret: process.env.SECRET_KEY, expiresIn: '24h' }
                ),
            ]);

            const refreshToken = await Promise.all([
                this.jwtService.signAsync(
                    { email: (await userWithEmail).email, id: (await userWithEmail).id },
                    { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '30d' }
                ),
            ]);

            return {
                errorCode: 200,
                message: 'Success',
                data: {
                    id: userWithEmail.id,
                    email: userWithEmail.email,
                    userName: userWithEmail.username,
                    accessToken: accessToken[0],
                    refreshToken: refreshToken[0],
                },
            };
        } catch (error) {
            console.log(error);
        }
    }
}
