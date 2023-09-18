import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

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

            return {
                errorCode: 200,
                message: 'Success',
                data: {
                    id: userWithEmail.id,
                    email: userWithEmail.email,
                    userName: userWithEmail.username,
                    accessToken: this.generateAccessToken({ id: userWithEmail.id }),
                    refreshToken: this.generateRefreshToken({ id: userWithEmail.id }),
                },
            };
        } catch (error) {
            console.log(error);
        }
    }

    async refreshToken(token: string) {
        try {
            const { id } = this.jwtService.verify(token, { secret: process.env.SECRET_KEY });
            return {
                errorCode: 200,
                message: 'Success',
                data: {
                    accessToken: this.generateAccessToken({ id: id }),
                },
            };
        } catch (error) {
            console.log(error);
        }
    }

    async getUserInfo(token: string) {
        try {
            const { id } = this.jwtService.verify(token, { secret: process.env.SECRET_KEY });
            const user = await this.userService.findOne({ where: { id: id } });
            if (user) {
                return {
                    errorCode: 200,
                    message: 'Success',
                    data: user,
                };
            }
        } catch (error) {
            console.log(error);
        }
    }

    private generateAccessToken(payload: { id: number }): string {
        return this.jwtService.sign(payload, { secret: process.env.SECRET_KEY });
    }

    private generateRefreshToken(payload: { id: number }): string {
        return this.jwtService.sign(payload, {
            secret: process.env.SECRET_KEY,
            expiresIn: '15m',
        });
    }
}
