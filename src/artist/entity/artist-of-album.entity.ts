import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Artist } from './artist.entity';
import { Album } from 'src/album/entity/album.entity';

@Entity({ name: 'artist_of_album' })
export class ArtistOfAlbum {
    @PrimaryColumn({ name: 'album_id' })
    album_id: number;

    @PrimaryColumn({ name: 'artist_id' })
    artist_id: number;

    @ManyToOne(() => Album)
    @JoinColumn({ name: 'album_id' })
    album: Album[];

    @ManyToOne(() => Artist)
    @JoinColumn({ name: 'artist_id' })
    artist: Artist[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt: Date;
}
