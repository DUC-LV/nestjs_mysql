import { Playlist } from 'src/playlist/entity/playlist.entity';
import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Song } from './song.entity';

@Entity({ name: 'song_of_playlist' })
export class SongOfPlaylist {
    @PrimaryColumn({ name: 'playlist_id' })
    playlist_id: number;

    @PrimaryColumn({ name: 'song_id' })
    song_id: number;

    @ManyToOne(() => Playlist)
    @JoinColumn({ name: 'playlist_id' })
    playlist: Playlist[];

    @ManyToOne(() => Song)
    @JoinColumn({ name: 'song_id' })
    song: Song[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt: Date;
}
