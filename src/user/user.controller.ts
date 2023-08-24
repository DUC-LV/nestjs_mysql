import { Controller, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async register(@Req() request: Request) {
        const req = request.body;
        return await this.userService.register(req.email, req.password, req.username);
    }

    @Post('login')
    async login(@Req() request: Request) {
        const req = request.body;
        return await this.userService.login(req.email, req.password);
    }

    // @Post('refreshToken')
    // async refreshToken(id: number, refreshToken: string) {
    //     return await this.userService.refreshToken(id, refreshToken);
    // }
}
