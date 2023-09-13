import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'song' })
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    title: string;

    @Column({ type: 'varchar', length: 200, nullable: false })
    alias: string;

    @Column({ type: 'varchar', length: 200, nullable: false, name: 'artist_names' })
    artist_names: string;

    @Column({ type: 'varchar', length: 200, nullable: false, name: 'thumbnail' })
    thumbnail: string;

    @Column({ type: 'varchar', length: 200, nullable: false, name: 'thumbnail_m' })
    thumbnail_m: string;

    @Column({ name: 'duration', nullable: false })
    duration: number;

    @Column({ type: 'varchar', length: 200, nullable: false, default: 'song', name: 'type' })
    type: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt: Date;
}
