import { Injectable } from '@nestjs/common';
import { Playlist } from './playlist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlaylistService {
    constructor(@InjectRepository(Playlist) private readonly playlistService: Repository<Playlist>) {}

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
}
