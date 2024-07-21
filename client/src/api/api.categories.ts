import { instance } from './axios.api.ts'
import { ICategory } from '../types/types.ts'

export const categoryApi = async () => {
	const { data } = await instance.get<ICategory[]>('/categories')
	return data
}

export const createCategory = async (title: string | '' | undefined) => {
	await instance.post('/categories', { title })
}

export const updateCategory = async (id: string | undefined, title: string | '' | undefined) => {
	await instance.patch(`/categories/category/${id}`, { title })
}

export const deleteCategory = async (id: string) => {
	await instance.delete(`/categories/category/${id}`)
}