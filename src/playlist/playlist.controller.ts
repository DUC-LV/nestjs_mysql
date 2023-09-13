import { Controller, Post, Req, Get, Param } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { Request } from 'express';

@Controller()
export class PlaylistController {
    constructor(private readonly playlistService: PlaylistService) {}

    @Post('update/playlist')
    async updatePlaylist(@Req() request: Request) {
        const req = request.body;
        return await this.playlistService.updatePlaylist(
            req.title,
            req.thumbnail,
            req.sortDescription,
            req.artistsNames,
            req.thumbnailM,
            req.type
        );
    }

    @Get('playlist')
    async getAllPlaylist() {
        return await this.playlistService.getAllPlaylist();
    }

    @Post('playlist-of-topic')
    async playlistOfTopic(@Req() request: Request) {
        const req = request.body;
        return await this.playlistService.updatePlaylistOfTopic(req.idTopic, req.idPlaylist);
    }

    @Get('playlist/:id')
    async playlistDetail(@Param('id') id: number) {
        return this.playlistService.playlistDetail(id);
    }
}
