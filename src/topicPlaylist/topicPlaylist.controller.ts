import { Controller, Get, Post, Req } from '@nestjs/common';
import { TopicPlaylistService } from './topicPlaylist.service';
import { Request } from 'express';

@Controller()
export class TopicPlaylistController {
    constructor(private readonly topicPlaylistService: TopicPlaylistService) {}

    @Post('update/topic-playlist')
    async updateTopicPlaylist(@Req() request: Request) {
        const req = request.body;
        return await this.topicPlaylistService.updateTopicPlaylist(req.title);
    }

    @Get('topic-playlist')
    async getAllTopic() {
        return await this.topicPlaylistService.getAllTopic();
    }
}
