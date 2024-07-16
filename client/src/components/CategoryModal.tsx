import { Form } from 'react-router-dom'
import { FC, SetStateAction, useEffect, useState } from 'react'

interface ICategoryModalProps {
	type: 'post' | 'patch'
	id?: string
	setVisibleModal: (visible: boolean) => void
	title?: string | ''
}

const CategoryModal: FC<ICategoryModalProps> = ({ type, id, setVisibleModal, title }) => {
	// Создаем состояние для значения инпута
	const [inputValue, setInputValue] = useState(title)

	// Обновляем значение инпута при изменении заголовка
	useEffect(() => {
		setInputValue(title || '')
	}, [title])

	const handleInputChange = (event: { target: { value: SetStateAction<string | undefined> } }) => {
		setInputValue(event.target.value)
	}

	return (
		<div className={'fixed top-0 left-0 bottom-0 right-0 w-full bg-black/50 flex justify-center items-center'}>
			<Form
				className={'grid gap-2 w-[300px] p-5 rounded-md bg-slate-900'}
				action={'/categories'}
				onSubmit={() => setVisibleModal(false)}
				method={type}
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
					<button type="button" onClick={() => setVisibleModal(false)} className={'btn btn-red'}>Close</button>
				</div>
			</Form>
		</div>
	)
}

export default CategoryModal