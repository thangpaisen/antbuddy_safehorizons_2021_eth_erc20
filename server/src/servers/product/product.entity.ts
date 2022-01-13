
import { IsDate } from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { CategoriesEntity } from "../categories/categories.entity";

@Entity({ name: 'product' })
export class ProductEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @ManyToOne(() => CategoriesEntity, item => item.id, {
        onDelete: 'CASCADE'
    })

    @JoinColumn({ name: "categories_id" })
    categories_id: CategoriesEntity;

    @Column({ type: 'varchar', name: 'product_name', nullable: false })
    product_name: string;

    @Column({ type: 'varchar', name: 'description', nullable: false })
    description: string;

    @Column({ type: 'int', name: 'price', nullable: false })
    price: number;

    @Column({ type: 'varchar', name: 'picture', nullable: false })
    picture: string;
    
    @CreateDateColumn({ name: 'create_at' })
    @IsDate()
    create_at: Date;
}
