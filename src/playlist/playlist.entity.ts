import { Artist } from 'src/artist/artist.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';

@Entity({ name: 'playlist' })
export class Playlist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    title: string;

    @Column({ type: 'varchar', length: 200, nullable: false, name: 'thumbnail' })
    thumbnail: string;

    @Column({ type: 'varchar', length: 200, nullable: false, name: 'sort_description' })
    sort_description: string;

    @Column({ type: 'varchar', length: 200, nullable: false, name: 'artist_names' })
    artist_names: string;

    @Column({ type: 'varchar', length: 200, nullable: false, name: 'thumbnail_m' })
    thumbnail_m: string;

    @Column({ type: 'varchar', length: 200, nullable: false, default: 'playlist', name: 'type' })
    type: string;

    @ManyToMany(() => Artist)
    @JoinTable({ name: 'artist_of_playlist' })
    artist: Artist[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt: Date;
}
