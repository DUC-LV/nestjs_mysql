import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Album } from './entity/album.entity';
import { Repository } from 'typeorm';
import { Song } from 'src/song/entity/song.entity';
import { AlbumOfSong } from './entity/album-of-song.entity';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(Album) private readonly albumService: Repository<Album>,
        @InjectRepository(Song) private readonly songService: Repository<Song>,
        @InjectRepository(AlbumOfSong) private readonly albumOfSongService: Repository<AlbumOfSong>
    ) {}

    async updateAlbum(
        title: string,
        thumbnail: string,
        releaseDate: string,
        sortDescription: string,
        releasedAt: string,
        artistNames: string,
        type: string
    ) {
        try {
            const album = await this.albumService.findOne({ where: { title } });
            if (album) {
                return {
                    errorCode: 201,
                    message: 'Album already exists!',
                    data: null,
                };
            }

            const newAlbum = await this.albumService.save({
                title,
                thumbnail,
                releaseDate,
                sortDescription,
                releasedAt,
                artistNames,
                type,
            });
            if (newAlbum) {
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

    async updateAlbumOfSong(idSong: number, idAlbum: number) {
        try {
            const song = await this.songService.findOne({ where: { id: idSong } });
            const album = await this.albumService.findOne({ where: { id: idAlbum } });

            const newAlbumOfSong = await this.albumOfSongService.save({
                song_id: song.id,
                album_id: album.id,
            });

            if (newAlbumOfSong) {
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
