import { IsDate } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'role' })
export class RoleEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: 'varchar', name: 'Quyen', unique: true })
    name_Role: string;

    @CreateDateColumn({ name: 'create_at' })
    @IsDate()
    create_at: Date;
}
