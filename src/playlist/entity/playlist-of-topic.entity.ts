import { TopicPlaylist } from 'src/topic-playlist/entity/topicPlaylist.entity';
import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Playlist } from './playlist.entity';

@Entity({ name: 'playlist_of_topic' })
export class PlaylistOfTopic {
    @PrimaryColumn({ name: 'topic_id' })
    topic_id: number;

    @PrimaryColumn({ name: 'playlist_id' })
    playlist_id: number;

    @ManyToOne(() => TopicPlaylist)
    @JoinColumn({ name: 'topic_id' })
    topics: TopicPlaylist[];

    @ManyToOne(() => Playlist)
    @JoinColumn({ name: 'playlist_id' })
    playlist: Playlist[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt: Date;
}
