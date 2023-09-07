import { Playlist } from 'src/playlist/entity/playlist.entity';
import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Artist } from './artist.entity';

@Entity({ name: 'artist_of_playlist' })
export class ArtistOfPlaylist {
    @PrimaryColumn({ name: 'playlist_id' })
    playlist_id: number;

    @PrimaryColumn({ name: 'artist_id' })
    artist_id: number;

    @ManyToOne(() => Playlist)
    @JoinColumn({ name: 'playlist_id' })
    playlists: Playlist[];

    @ManyToOne(() => Artist)
    @JoinColumn({ name: 'artist_id' })
    artists: Artist[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt: Date;
}
