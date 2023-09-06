import { Playlist } from 'src/playlist/entity/playlist.entity';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Artist } from './artist.entity';

@Entity({ name: 'artist_of_playlist' })
export class ArtistOfPlaylist {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Playlist)
    @JoinColumn({ name: 'playlist_id' })
    playlist_id: number;

    @ManyToOne(() => Artist)
    @JoinColumn({ name: 'artist_id' })
    artist_id: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt: Date;
}
