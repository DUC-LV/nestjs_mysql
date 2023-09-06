import { Injectable } from '@nestjs/common';
import { Playlist } from './entity/playlist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TopicPlaylist } from 'src/topic-playlist/entity/topicPlaylist.entity';
import { PlaylistOfTopic } from './entity/playlist-of-topic.entity';

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(Playlist) private readonly playlistService: Repository<Playlist>,
        @InjectRepository(TopicPlaylist) private readonly topicPlaylistService: Repository<TopicPlaylist>,
        @InjectRepository(PlaylistOfTopic) private readonly playlistOfTopicSerVice: Repository<PlaylistOfTopic>
    ) {}

    async updatePlaylist(
        title: string,
        thumbnail: string,
        sort_description: string,
        artist_names: string,
        thumbnail_m: string,
        type: string
    ) {
        try {
            const playlist = await this.playlistService.findOne({ where: { title } });
            if (playlist) {
                return {
                    errorCode: 201,
                    message: 'Playlist already exists!',
                    data: null,
                };
            }

            const newPlaylist = await this.playlistService.save({
                title,
                thumbnail,
                sort_description,
                artist_names,
                thumbnail_m,
                type,
            });
            if (newPlaylist) {
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

    async getAllPlaylist() {
        try {
            const playlist = await this.playlistService.createQueryBuilder().getMany();
            if (playlist) {
                return {
                    errorCode: 200,
                    message: 'Success',
                    data: playlist,
                };
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updatePlaylistOfTopic(idTopic: number, idPlaylist: number) {
        try {
            const topic = await this.topicPlaylistService.findOne({ where: { id: idTopic } });
            const playlist = await this.playlistService.findOne({ where: { id: idPlaylist } });

            const newPlaylistOfTopic = await this.playlistOfTopicSerVice.save({
                topic_id: topic.id,
                playlist_id: playlist.id,
            });

            if (newPlaylistOfTopic) {
                return {
                    errCode: 200,
                    message: 'Successfully',
                };
            }
        } catch (error) {
            console.log(error);
        }
    }
}
