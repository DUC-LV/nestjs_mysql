import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistOfPlaylist } from 'src/artist/entity/artist-of-playlist.entity';
import { Artist } from 'src/artist/entity/artist.entity';
import { PlaylistOfTopic } from 'src/playlist/entity/playlist-of-topic.entity';
import { Playlist } from 'src/playlist/entity/playlist.entity';
import { TopicPlaylist } from 'src/topic-playlist/entity/topicPlaylist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HomeService {
    constructor(
        @InjectRepository(TopicPlaylist) private readonly topicPlaylistService: Repository<TopicPlaylist>,
        @InjectRepository(Playlist) private readonly playlistService: Repository<Playlist>,
        @InjectRepository(PlaylistOfTopic) private readonly playlistOfTopicService: Repository<PlaylistOfTopic>,
        @InjectRepository(Artist) private readonly artistService: Repository<Artist>,
        @InjectRepository(ArtistOfPlaylist) private readonly artistOfPlaylistService: Repository<ArtistOfPlaylist>
    ) {}

    async getHome() {
        const res = [];
        const topic = await this.topicPlaylistService.createQueryBuilder().getMany();

        for (const i of topic) {
            const playlistOfTopic = await this.playlistOfTopicService
                .createQueryBuilder()
                .where({ topic_id: i.id })
                .getMany();

            const arrPlaylist = [];
            for (const j of playlistOfTopic) {
                const playlist = await this.playlistService.findOne({ where: { id: j.playlist_id } });

                const artistOfPlaylist = await this.artistOfPlaylistService
                    .createQueryBuilder()
                    .where({ playlist_id: playlist.id })
                    .getMany();

                const arrArtist = [];
                for (const a of artistOfPlaylist) {
                    const artist = await this.artistService.findOne({ where: { id: a.artist_id } });
                    arrArtist.push(artist);
                }

                const res = Object.assign(playlist, { artist: arrArtist });
                arrPlaylist.push(res);
            }

            res.push({
                sectionType: 'playlist',
                viewType: 'slider',
                title: i.title,
                link: '',
                data: arrPlaylist,
            });
        }
        return {
            errCode: 200,
            message: 'Successfully',
            data: {
                items: res,
            },
        };
    }
}
