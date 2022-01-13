import { IsDate } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'status_order' })
export class StatusOrderEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: 'varchar', name: 'status_name', unique: true })
    status_name: string;

    @CreateDateColumn({ name: 'create_at' })
    @IsDate()
    create_at: Date;
}
