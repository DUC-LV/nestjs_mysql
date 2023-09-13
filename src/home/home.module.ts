import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistController } from 'src/artist/artist.controller';
import { Artist } from 'src/artist/entity/artist.entity';
import { ArtistService } from 'src/artist/artist.service';
import { PlaylistController } from 'src/playlist/playlist.controller';
import { Playlist } from 'src/playlist/entity/playlist.entity';
import { PlaylistService } from 'src/playlist/playlist.service';
import { TopicPlaylistController } from 'src/topic-playlist/topicPlaylist.controller';
import { TopicPlaylist } from 'src/topic-playlist/entity/topicPlaylist.entity';
import { TopicPlaylistService } from 'src/topic-playlist/topicPlaylist.service';
import { PlaylistOfTopic } from 'src/playlist/entity/playlist-of-topic.entity';
import { ArtistOfPlaylist } from 'src/artist/entity/artist-of-playlist.entity';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { Album } from 'src/album/entity/album.entity';
import { ArtistOfAlbum } from 'src/artist/entity/artist-of-album.entity';
import { ArtistOfSong } from 'src/artist/entity/artist-of-song.entity';
import { AlbumOfSong } from 'src/album/entity/album-of-song.entity';
import { SongService } from 'src/song/song.service';
import { AlbumService } from 'src/album/album.service';
import { SongController } from 'src/song/song.controller';
import { AlbumController } from 'src/album/album.controller';
import { SongOfPlaylist } from 'src/song/entity/song-of-playlist.entity';
import { Song } from 'src/song/entity/song.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TopicPlaylist,
            Playlist,
            Artist,
            PlaylistOfTopic,
            ArtistOfPlaylist,
            Album,
            ArtistOfAlbum,
            ArtistOfSong,
            AlbumOfSong,
            SongOfPlaylist,
            Song,
        ]),
    ],
    providers: [TopicPlaylistService, PlaylistService, ArtistService, HomeService, SongService, AlbumService],
    controllers: [
        TopicPlaylistController,
        PlaylistController,
        ArtistController,
        HomeController,
        SongController,
        AlbumController,
    ],
})
export class HomeModule {}
