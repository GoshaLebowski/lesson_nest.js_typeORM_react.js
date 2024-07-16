import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Transaction } from './entities/transaction.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TransactionService {
	constructor(
		@InjectRepository(Transaction)
		private readonly transactionRepository: Repository<Transaction>
	) {
	}

	async create(createTransactionDto: CreateTransactionDto, id: string) {
		const newTransaction = {
			title: createTransactionDto.title,
			amount: createTransactionDto.amount,
			type: createTransactionDto.type,
			category: { id: createTransactionDto.category.id }, // Скорректируйте, чтобы получить доступ к id свойства Category
			user: { id }
		}

		if (!newTransaction) throw new BadRequestException('Something went wrong...')

		return await this.transactionRepository.save(newTransaction)
	}

	async findAll(id: string) {
		const transaction = this.transactionRepository.find({
			where: {
				user: { id }
			},
			order: {
				createdAt: 'DESC'
			}
		})
		if (!transaction) throw new NotFoundException('Something went wrong...')
		return transaction
	}

	async findOne(id: string) {
		const transaction = await this.transactionRepository.findOne({
			where: {
				id
			},
			relations: {
				user: true,
				category: true
			}
		})
		if (!transaction) throw new NotFoundException('Something went wrong...')
		if (transaction.user) {
			delete transaction.user.password
		}
		return transaction
	}

	async update(id: string, updateTransactionDto: UpdateTransactionDto) {
		const transaction = this.transactionRepository.findOne({
			where: { id }
		})

		if (!transaction) {
			throw new NotFoundException('Transaction not found!')
		}

		return await this.transactionRepository.update(id, updateTransactionDto)
	}

	async remove(id: string) {
		const transaction = await this.transactionRepository.findOne({
			where: { id }
		})

		if (!transaction) throw new NotFoundException('Transaction not found!')

		return await this.transactionRepository.delete(id)
	}

	async findAllWithPagination(id: string, page: number, limit: number) {
		return await this.transactionRepository.find({
			where: {
				user: { id }
			},
			order: {
				createdAt: 'DESC'
			},
			take: limit,
			skip: (page - 1) * limit
		})
	}

	async findAllByType(id: string, type: string) {
		const transaction = await this.transactionRepository.find({
			where: {
				user: { id },
				type
			}
		})

		return transaction.reduce((acc, obj) => acc + obj.amount, 0)
	}
}
