import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller()
export class HomeController {
    constructor(private readonly homeService: HomeService) {}

    @Get('public/v1/composite/get-home')
    async getHome() {
        return await this.homeService.getHome();
    }
}
