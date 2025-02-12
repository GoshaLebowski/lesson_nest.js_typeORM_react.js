import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {Transaction} from "../../transaction/entities/transaction.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid', {name: 'category_id'})
    id: string;

    @Column()
    title: string

    @ManyToOne(() => User, (user) => user.categories)
    @JoinColumn({name: 'user_id'})
    user: User

    @OneToMany(() => Transaction, (transaction) => transaction.user, {
        onDelete: "CASCADE"
    })
    transactions: Transaction[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
