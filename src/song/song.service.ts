import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entity/song.entity';
import { Repository } from 'typeorm';
import { Playlist } from 'src/playlist/entity/playlist.entity';
import { SongOfPlaylist } from './entity/song-of-playlist.entity';

@Injectable()
export class SongService {
    constructor(
        @InjectRepository(Song) private readonly songService: Repository<Song>,
        @InjectRepository(Playlist) private readonly playlistService: Repository<Playlist>,
        @InjectRepository(SongOfPlaylist) private readonly songOfPlaylistService: Repository<SongOfPlaylist>
    ) {}

    async updateSong(
        title: string,
        alias: string,
        artist_names: string,
        thumbnail: string,
        thumbnail_m: string,
        duration: number,
        type: string
    ) {
        try {
            const song = await this.songService.findOne({ where: { title } });
            if (song) {
                return {
                    errorCode: 201,
                    message: 'Song already exists!',
                    data: null,
                };
            }

            const newSong = await this.songService.save({
                title,
                alias,
                artist_names,
                thumbnail,
                thumbnail_m,
                duration,
                type,
            });

            if (newSong) {
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

    async updateSongOfPlaylist(idPlaylist: number, idSong: number) {
        const playlist = await this.playlistService.findOne({ where: { id: idPlaylist } });
        const song = await this.songService.findOne({ where: { id: idSong } });

        const newSongOfPlaylist = await this.songOfPlaylistService.save({ playlist_id: playlist.id, song_id: song.id });
        if (newSongOfPlaylist) {
            return {
                errCode: 200,
                message: 'Successfully',
            };
        }
        try {
        } catch (error) {
            console.log(error);
        }
    }
}
