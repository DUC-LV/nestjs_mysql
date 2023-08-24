import { Injectable } from '@nestjs/common';
import { TopicPlaylist } from './topicPlaylist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Playlist } from 'src/playlist/playlist.entity';

@Injectable()
export class TopicPlaylistService {
    constructor(@InjectRepository(TopicPlaylist) private readonly topicPlaylistService: Repository<TopicPlaylist>) {}

    async updateTopicPlaylist(title: string) {
        try {
            const topic = await this.topicPlaylistService.findOne({ where: { title } });

            if (topic) {
                return {
                    errorCode: 201,
                    message: 'Topic already exists!',
                    data: null,
                };
            }

            const newTopic = await this.topicPlaylistService.save({ title });

            if (newTopic) {
                return {
                    errorCode: 200,
                    message: 'Update successfully!',
                    data: null,
                };
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getAllTopic() {
        try {
            const topic = await this.topicPlaylistService.createQueryBuilder().getMany();
            if (topic) {
                return {
                    errorCode: 200,
                    message: 'Success',
                    data: topic,
                };
            }
        } catch (error) {
            console.log(error);
        }
    }
}
