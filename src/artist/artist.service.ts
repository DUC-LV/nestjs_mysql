import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entity/artist.entity';
import { Playlist } from 'src/playlist/entity/playlist.entity';
import { ArtistOfPlaylist } from './entity/artist-of-playlist.entity';

@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(Artist) private readonly artistService: Repository<Artist>,
        @InjectRepository(Playlist) private readonly playlistService: Repository<Playlist>,
        @InjectRepository(ArtistOfPlaylist) private readonly artistOfPlaylistService: Repository<ArtistOfPlaylist>
    ) {}

    async updateArtist(name: string, alias: string, thumbnail: string, thumbnail_m: string, total_follow: number) {
        try {
            const artist = await this.artistService.findOne({ where: { name } });
            if (artist) {
                return {
                    errorCode: 201,
                    message: 'Artist already exists!',
                    data: null,
                };
            }

            const newArtist = await this.artistService.save({ name, alias, thumbnail, thumbnail_m, total_follow });
            if (newArtist) {
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

    async getAllArtist() {
        try {
            const artist = await this.artistService.createQueryBuilder().getMany();
            if (artist) {
                return {
                    errorCode: 200,
                    message: 'Success',
                    data: artist,
                };
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateArtistOfPlaylist(idPlaylist: number, idArtist: number) {
        try {
            const playlist = await this.playlistService.findOne({ where: { id: idPlaylist } });
            const artist = await this.artistService.findOne({ where: { id: idArtist } });

            const newArtistOfPlaylist = await this.artistOfPlaylistService.save({
                playlist_id: playlist.id,
                artist_id: artist.id,
            });

            if (newArtistOfPlaylist) {
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
