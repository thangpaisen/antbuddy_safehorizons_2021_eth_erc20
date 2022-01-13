
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
@Entity({ name: 'categories' })
export class CategoriesEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: 'varchar', name: 'categoryName', nullable: false })
    categoryName: string;

    @Column({ type: 'varchar', name: 'description', nullable: false })
    description: string;

    @Column({ type: 'varchar', name: 'picture', nullable: false })
    picture: string;
}
