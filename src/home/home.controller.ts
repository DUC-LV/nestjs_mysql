import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';
// import { AuthGuard } from '@nestjs/passport';

@Controller()
export class HomeController {
    constructor(private readonly homeService: HomeService) {}

    // @UseGuards(AuthGuard('jwt'))
    @Get('public/v1/composite/get-home')
    async getHome() {
        return await this.homeService.getHome();
    }
}
