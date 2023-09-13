import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Song } from '../../song/entity/song.entity';
import { Artist } from './artist.entity';

@Entity({ name: 'artist_of_song' })
export class ArtistOfSong {
    @PrimaryColumn({ name: 'song_id' })
    song_id: number;

    @PrimaryColumn({ name: 'artist_id' })
    artist_id: number;

    @ManyToOne(() => Song)
    @JoinColumn({ name: 'song_id' })
    song: Song[];

    @ManyToOne(() => Artist)
    @JoinColumn({ name: 'artist_id' })
    artist: Artist[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt: Date;
}
