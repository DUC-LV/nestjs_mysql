import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'topic_playlist' })
export class TopicPlaylist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'title', type: 'varchar', length: 128, nullable: false })
    title: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt: Date;
}
