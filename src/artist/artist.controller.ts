import { Controller, Post, Req, Get } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Request } from 'express';

@Controller()
export class ArtistController {
    constructor(private readonly artistService: ArtistService) {}

    @Post('update/artist')
    async updateArtist(@Req() request: Request) {
        const req = request.body;
        return await this.artistService.updateArtist(
            req.name,
            req.alias,
            req.thumbnail,
            req.thumbnailM,
            req.totalFollow
        );
    }

    @Get('artist')
    async getAllArtist() {
        return await this.artistService.getAllArtist();
    }

    @Post('artist-of-playlist')
    async playlistOfTopic(@Req() request: Request) {
        const req = request.body;
        return await this.artistService.updateArtistOfPlaylist(req.idPlaylist, req.idArtist);
    }
}
