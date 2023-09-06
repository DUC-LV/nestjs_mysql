import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt: Date;
}
