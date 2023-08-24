import { Playlist } from 'src/playlist/playlist.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'topic_playlist' })
export class TopicPlaylist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'title', type: 'varchar', length: 128, nullable: false })
    title: string;

    @ManyToMany(() => Playlist)
    @JoinTable({ name: 'playlist_of_topic' })
    playlist: Playlist[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt: Date;
}
