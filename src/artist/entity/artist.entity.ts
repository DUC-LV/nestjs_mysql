import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'artist' })
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 200, nullable: false, name: 'name' })
    name: string;

    @Column({ type: 'varchar', length: 200, nullable: false, name: 'alias' })
    alias: string;

    @Column({ type: 'varchar', length: 200, nullable: false, name: 'thumbnail' })
    thumbnail: string;

    @Column({ type: 'varchar', length: 200, nullable: false, name: 'thumbnail_m' })
    thumbnail_m: string;

    @Column({ type: 'int', nullable: true, default: 0, name: 'total_follow' })
    total_follow: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt: Date;
}
