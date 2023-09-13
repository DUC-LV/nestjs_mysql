import { Controller, Post, Req } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Request } from 'express';

@Controller()
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Post('update-album')
    async updateAlbum(@Req() request: Request) {
        const req = request.body;
        return await this.albumService.updateAlbum(
            req.title,
            req.thumbnail,
            req.releaseDate,
            req.sortDescription,
            req.releasedAt,
            req.artistNames,
            req.type
        );
    }

    @Post('album-of-song')
    async updateAlbumOfSong(@Req() request: Request) {
        const req = request.body;
        return await this.albumService.updateAlbumOfSong(req.idSong, req.idAlbum);
    }
}
