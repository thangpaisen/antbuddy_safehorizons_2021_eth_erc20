
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
    OneToMany
} from "typeorm";
import { StatusOrderEntity } from "../statusOrder/statusOrder.entity";
import { UserEntity } from "../User/User.entity";

@Entity({ name: 'order' })
export class OrderEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @ManyToOne(() => UserEntity, item => item.id, {
        onDelete: 'CASCADE'
    })

    @JoinColumn({ name: "user_id" })
    user_id: UserEntity;

    @ManyToOne(() => StatusOrderEntity, item => item.id, {
        onDelete: 'CASCADE',
    })

    @JoinColumn({ name: "status_order" })
    status_order: StatusOrderEntity;

    @Column({ type: 'timestamp', name: 'order_date', nullable: false })
    order_date: Date;

}
