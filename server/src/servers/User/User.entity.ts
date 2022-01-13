import { RoleEntity } from './../Role/Role.entity';

import { IsDate } from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Exclude } from 'class-transformer';

@Entity({ name: 'user' })
export class UserEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @ManyToOne(() => RoleEntity, item => item.id, {
        onDelete: 'CASCADE'
    })

    @JoinColumn({ name: "role_id" })
    role_id: RoleEntity;

    @Column({ type: 'varchar', name: 'name', nullable: false })
    name: string;

    @Column({ type: 'varchar', name: 'email', unique: true })
    email: string;

    @Column({ type: 'varchar', name: 'password'})
    password: string;

    @Column({ type: 'varchar', name: 'phone', nullable: true })
    phone: string;

    @Column({ type: 'varchar', name: 'avatar', nullable: true })
    avatar: string;

    @CreateDateColumn({ name: 'create_at' })
    @IsDate()
    create_at: Date;

}
