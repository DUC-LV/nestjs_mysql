import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, type: 'varchar', length: 255, nullable: false })
    email: string;

    @Column({ name: 'user_name', type: 'varchar', nullable: true })
    username: string;

    @Column({ type: 'varchar', length: 128, nullable: false })
    password: string;

    @Column({
        type: 'varchar',
        length: 128,
        nullable: true,
        name: 'avatar_url',
    })
    avatarUrl: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt: Date;
}
