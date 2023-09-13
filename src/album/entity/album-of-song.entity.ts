import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Song } from '../../song/entity/song.entity';
import { Album } from './album.entity';

@Entity({ name: 'album_of_song' })
export class AlbumOfSong {
    @PrimaryColumn({ name: 'song_id' })
    song_id: number;

    @PrimaryColumn({ name: 'album_id' })
    album_id: number;

    @ManyToOne(() => Song)
    @JoinColumn({ name: 'song_id' })
    song: Song[];

    @ManyToOne(() => Album)
    @JoinColumn({ name: 'album_id' })
    album: Album[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt: Date;
}
