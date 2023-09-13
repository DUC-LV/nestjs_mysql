import { Injectable } from '@nestjs/common';
import { Playlist } from './entity/playlist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TopicPlaylist } from 'src/topic-playlist/entity/topicPlaylist.entity';
import { PlaylistOfTopic } from './entity/playlist-of-topic.entity';
import { ArtistOfPlaylist } from 'src/artist/entity/artist-of-playlist.entity';
import { Artist } from 'src/artist/entity/artist.entity';
import { SongOfPlaylist } from 'src/song/entity/song-of-playlist.entity';
import { Song } from 'src/song/entity/song.entity';
import { ArtistOfSong } from 'src/artist/entity/artist-of-song.entity';
import { AlbumOfSong } from 'src/album/entity/album-of-song.entity';
import { Album } from 'src/album/entity/album.entity';
import { ArtistOfAlbum } from 'src/artist/entity/artist-of-album.entity';

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(Playlist) private readonly playlistService: Repository<Playlist>,
        @InjectRepository(TopicPlaylist) private readonly topicPlaylistService: Repository<TopicPlaylist>,
        @InjectRepository(PlaylistOfTopic) private readonly playlistOfTopicSerVice: Repository<PlaylistOfTopic>,
        @InjectRepository(ArtistOfPlaylist) private readonly artistOfPlaylistService: Repository<ArtistOfPlaylist>,
        @InjectRepository(Artist) private readonly artistService: Repository<Artist>,
        @InjectRepository(SongOfPlaylist) private readonly songOfPlaylist: Repository<SongOfPlaylist>,
        @InjectRepository(Song) private readonly songService: Repository<Song>,
        @InjectRepository(ArtistOfSong) private readonly artistOfSongService: Repository<ArtistOfSong>,
        @InjectRepository(AlbumOfSong) private readonly albumOfSongService: Repository<AlbumOfSong>,
        @InjectRepository(Album) private readonly albumService: Repository<Album>,
        @InjectRepository(ArtistOfAlbum) private readonly artistOfAlbumService: Repository<ArtistOfAlbum>
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

    async playlistDetail(id: number) {
        try {
            const playlist = await this.playlistService.findOne({ where: { id: id } });
            const artistOfPlaylist = await this.artistOfPlaylistService
                .createQueryBuilder()
                .where({ playlist_id: id })
                .getMany();

            const arrArtist = [];
            for (const a of artistOfPlaylist) {
                const artist = await this.artistService.findOne({ where: { id: a.artist_id } });
                arrArtist.push(artist);
            }

            const songOfPlaylist = await this.songOfPlaylist.createQueryBuilder().where({ playlist_id: id }).getMany();

            const arrSong = [];
            for (const s of songOfPlaylist) {
                const song = await this.songService.findOne({ where: { id: s.song_id } });
                const artistOfSong = await this.artistOfSongService
                    .createQueryBuilder()
                    .where({ song_id: s.song_id })
                    .getMany();

                const arrArtist = [];
                for (const a of artistOfSong) {
                    const artist = await this.artistService.findOne({ where: { id: a.artist_id } });
                    arrArtist.push(artist);
                }

                const albumOfSong = await this.albumOfSongService
                    .createQueryBuilder()
                    .where({ song_id: s.song_id })
                    .getMany();

                let arrAlbum = new Object();
                for (const a of albumOfSong) {
                    const album = await this.albumService.findOne({ where: { id: a.album_id } });

                    const artistOfAlbum = await this.artistOfAlbumService
                        .createQueryBuilder()
                        .where({ album_id: album.id })
                        .getMany();

                    const arrArtist = [];
                    for (const a of artistOfAlbum) {
                        const artist = await this.artistService.findOne({ where: { id: a.artist_id } });
                        arrArtist.push(artist);
                    }

                    arrAlbum = Object.assign(album, { artist: arrArtist });
                }

                const resSong = Object.assign(song, { artist: arrArtist }, { album: arrAlbum });
                arrSong.push(resSong);
            }

            const res = Object.assign(playlist, { artist: arrArtist }, { song: { items: arrSong } });

            return {
                errCode: 200,
                message: 'Success',
                data: res,
            };
        } catch (error) {
            console.log(error);
        }
    }
}
