import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import { User } from '../../user/entities/user.entity'
import { Category } from '../../category/entities/category.entity'

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid', { name: 'transaction_id' })
    id: string

    @Column()
    title: string

    @Column({nullable: true})
    type: string

    @ManyToOne(() => User, (transaction) => transaction.transactions)
    @JoinColumn({name: 'user_id'})
    user: User

    @ManyToOne(() => Category, (category) => category.transactions, {
        onDelete: 'SET NULL'
    })
    @JoinColumn({name: 'category_id'})
    category: Category

    @Column()
    amount: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
