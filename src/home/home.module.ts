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

@Module({
    imports: [TypeOrmModule.forFeature([TopicPlaylist, Playlist, Artist, PlaylistOfTopic, ArtistOfPlaylist])],
    providers: [TopicPlaylistService, PlaylistService, ArtistService],
    controllers: [TopicPlaylistController, PlaylistController, ArtistController],
})
export class HomeModule {}
