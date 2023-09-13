import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'album' })
export class Album {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    title: string;

    @Column({ type: 'varchar', length: 200, nullable: false, name: 'thumbnail' })
    thumbnail: string;

    @Column({ type: 'varchar', length: 200, nullable: false, name: 'release_date' })
    releaseDate: string;

    @Column({ type: 'varchar', length: 200, nullable: true, name: 'sort_description' })
    sortDescription: string;

    @Column({ type: 'varchar', length: 200, nullable: true, name: 'released_at' })
    releasedAt: string;

    @Column({ type: 'varchar', length: 200, nullable: true, name: 'artist_names' })
    artistNames: string;

    @Column({ type: 'varchar', length: 200, nullable: true, name: 'type', default: 'album' })
    type: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt: Date;
}
