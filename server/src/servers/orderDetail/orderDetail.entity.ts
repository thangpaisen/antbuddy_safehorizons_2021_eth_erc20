
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToOne
} from "typeorm";
import { OrderEntity } from "../order/order.entity";
import { ProductEntity } from "../product/product.entity";
import { StatusOrderEntity } from "../statusOrder/statusOrder.entity";

@Entity({ name: 'orderdetail' })
export class OrderDetailEntity {



    @ManyToOne(() => OrderEntity, item => item.id, {
        onDelete: 'CASCADE',
        primary: true
    })

    @JoinColumn({ name: "order_id" })
    order_id: OrderEntity;

    @ManyToOne(() => ProductEntity, item => item.id, {
        onDelete: 'CASCADE',
        primary: true
    })

    @JoinColumn({ name: "product_id", })
    product_id: ProductEntity;

    @Column({ type: 'int', name: 'quantity', nullable: false })
    quantity: number;

    @Column({ type: 'int', name: 'unit_price', nullable: false })
    unit_price: number;

    @Column({ type: 'timestamp', name: 'order_detail_date', nullable: false })
    order_detail_date: Date;

}
