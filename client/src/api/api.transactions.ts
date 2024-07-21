import { instance } from './axios.api.ts'
import { IFormDataTransaction, ITransactionCreate, ITransactionResponse } from '../types/types.ts'

export const transactionApi = async (): Promise<ITransactionResponse[]> => {
	try {
		const { data } = await instance.get('/transactions')
		return data
	} catch (error) {
		console.error('Failed to load all transactions:', error)
		return []
	}
}

export const createTransaction = async (formData: IFormDataTransaction) => {
	await instance.post<ITransactionCreate>('/transactions', {
		title: formData.title,
		amount: +formData.amount,
		type: formData.type,
		category: {
			id: formData.category
		}
	})
}

export const deleteTransaction = async (id: string) => {
	await instance.delete(`/transactions/transaction/${id}`)
}

export const transPagination = async (page: number, limit: number) => {
	try {
		const response = await instance.get<ITransactionResponse[]>('/transactions/pagination', {
			params: { page, limit }
		})
		return response.data
	} catch (error) {
		console.error('Failed to load all transactions:', error)
		return []
	}
}