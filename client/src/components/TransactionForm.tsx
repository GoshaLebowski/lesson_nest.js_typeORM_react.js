import React, { FC, FormEvent, useEffect, useState } from 'react'
import { Form } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import CategoryModal from './CategoryModal'
import { ICategory, IFormDataTransaction } from '../types/types'
import { categoryApi } from '../api/api.categories'
import { toast } from 'react-toastify'
import { createTransaction } from '../api/api.transactions'

interface TransactionFormProps {
	loadPagination: (page: number) => Promise<void>,
	currentPage: number,
}

const TransactionForm: FC<TransactionFormProps> = (
	{
		loadPagination,
		currentPage,
	}) => {
	const [visibleModal, setVisibleModal] = useState(false)
	const [categories, setCategories] = useState<ICategory[]>([])
	const initialFormData: IFormDataTransaction = {
		title: '',
		amount: '',
		category: '',
		type: ''
	}
	const [formData, setFormData] = useState<IFormDataTransaction>(initialFormData)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = event.target
		setFormData((prevState) => ({
			...prevState,
			[name]: value
		}))
	}

	useEffect(() => {
		loadCategories()
	}, [])

	const loadCategories = async () => {
		try {
			const data = await categoryApi()
			setCategories(data)
		} catch (e) {
			console.error('Failed to load categories:', e)
		}
	}

	const handleCloseModal = async () => {
		setVisibleModal(false)
		await loadCategories()
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		try {
			await createTransaction(formData) //Отправка запроса на добавление
			await loadPagination(currentPage) //Обновление состояние
			setFormData(initialFormData)
			toast.success('Transaction added successfully')
		} catch (e: any) {
			const error = e.response?.data?.message
			toast.error(error.toString() + '\n')
		}
	}

	return (
		<div className="rounded-md bg-slate-800 p-4">
			<Form className="grid gap-2" onSubmit={handleSubmit}>
				<label className="grid" htmlFor="title">
					<span>Title</span>
					<input
						type="text"
						className="input bg-slate-800 border-slate-700"
						placeholder="Title..."
						name="title"
						value={formData.title}
						onChange={handleChange}
					/>
				</label>
				<label className="grid" htmlFor="amount">
					<span>Amount</span>
					<input
						type="text"
						className="input bg-slate-800 border-slate-700"
						placeholder="Amount..."
						name="amount"
						value={formData.amount}
						onChange={handleChange}
					/>
				</label>

				{categories.length ? (
					<label htmlFor="category" className="grid">
						<span>Category</span>
						<select
							name="category"
							value={formData.category}
							onChange={handleChange}
							className="input bg-slate-800 border-slate-700"
						>
							<option value="" disabled hidden>
								Select a category...
							</option>
							{categories.map((ctg, idx) => (
								<option key={idx} value={ctg.id}>
									{ctg.title}
								</option>
							))}
						</select>
					</label>
				) : (
					<h1 className="mt-1 text-red-300">To continue create a category first</h1>
				)}

				<button
					onClick={() => setVisibleModal(true)}
					className="max-w-fit flex items-center gap-2 text-white/50 hover:text-white"
					type="button"
				>
					<FaPlus />
					<span>Manage Categories</span>
				</button>

				<div className="flex items-center gap-4">
					<label className="cursor-pointer flex items-center gap-2">
						<input
							type="radio"
							name="type"
							value="income"
							checked={formData.type === 'income'}
							onChange={handleChange}
							className="form-radio, text-blue-600"
						/>
						<span>Income</span>
					</label>
					<label className="cursor-pointer flex items-center gap-2">
						<input
							type="radio"
							name="type"
							value="expense"
							checked={formData.type === 'expense'}
							onChange={handleChange}
							className="form-radio, text-blue-600"
						/>
						<span>Expense</span>
					</label>
				</div>

				<button className="btn btn-green max-w-fit mt-2">Submit</button>
			</Form>

			{visibleModal && <CategoryModal type="post" setVisibleModal={handleCloseModal} />}
		</div>
	)
}

export default TransactionForm
