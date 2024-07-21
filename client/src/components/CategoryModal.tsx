import { Form } from 'react-router-dom'
import React, { FC, FormEvent, useEffect, useState } from 'react'
import { createCategory, updateCategory } from '../api/api.categories.ts'
import { toast } from 'react-toastify'

interface ICategoryModalProps {
	type: 'post' | 'patch';
	id?: string;
	setVisibleModal: (visible: boolean) => void;
	title?: string | '';
}

const CategoryModal: FC<ICategoryModalProps> = (
	{
		type,
		id,
		setVisibleModal,
		title
	}
) => {
	const [
		inputValue,
		setInputValue
	] = useState<string>(title || '')

	useEffect(() => {
		setInputValue(title || '')
	}, [title])

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setInputValue(event.target.value)
	}

	const handleSubmit = async (
		event: FormEvent<HTMLFormElement>
	) => {
		event.preventDefault()
		try {
			if (type === 'post') {
				await createCategory(inputValue)
				toast.success('You create category')
			} else if (type === 'patch') {
				await updateCategory(id, inputValue)
				toast.success('You update category')
			}
			setVisibleModal(false)
		} catch (e: any) {
			const error = e.response?.data?.message
			toast.error(error.toString())
		}
	}

	return (
		<div
			className={
				'fixed ' +
				'top-0 ' +
				'left-0 ' +
				'bottom-0 ' +
				'right-0 ' +
				'w-full ' +
				'bg-black/50 ' +
				'flex ' +
				'justify-center ' +
				'items-center'
			}
		>
			<Form
				className={
					'grid ' +
					'gap-2 ' +
					'w-[300px] ' +
					'p-5 ' +
					'rounded-md ' +
					'bg-slate-900'
				}
				onSubmit={handleSubmit}
			>
				<label htmlFor="title">
					<small>Category Title</small>
					<input
						type={'text'}
						name={'title'}
						placeholder={'Title...'}
						value={inputValue}
						className={'input w-full'}
						onChange={handleInputChange}
					/>
					<input type={'hidden'} name={'id'} value={id} />
				</label>

				<div className="flex items-center gap-2">
					<button className={'btn btn-green'} type={'submit'}>
						{type === 'patch' ? 'Save' : 'Create'}
					</button>
					<button
						type="button"
						onClick={() => setVisibleModal(false)}
						className={'btn btn-red'}
					>
						Close
					</button>
				</div>
			</Form>
		</div>
	)
}

export default CategoryModal