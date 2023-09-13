import { Controller, Post, Req } from '@nestjs/common';
import { SongService } from './song.service';
import { Request } from 'express';

@Controller()
export class SongController {
    constructor(private readonly songService: SongService) {}

    @Post('update-song')
    async updateSong(@Req() request: Request) {
        const req = request.body;
        return await this.songService.updateSong(
            req.title,
            req.alias,
            req.artistsNames,
            req.thumbnail,
            req.thumbnailM,
            req.duration,
            req.type
        );
    }

    @Post('update/song-of-playlist')
    async updateSongOfPlaylist(@Req() request: Request) {
        const req = request.body;
        return await this.songService.updateSongOfPlaylist(req.idPlaylist, req.idSong);
    }
}
