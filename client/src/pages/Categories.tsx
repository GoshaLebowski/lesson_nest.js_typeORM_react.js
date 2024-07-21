import { FC, useEffect, useState } from 'react'
import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import CategoryModal from '../components/CategoryModal.tsx'
import { ICategory } from '../types/types.ts'
import { categoryApi, deleteCategory } from '../api/api.categories.ts'
import { toast } from 'react-toastify'

const Categories: FC = () => {
	const [
		categories,
		setCategories
	] = useState<ICategory[]>([])
	const [
		categoryId,
		setCategoryId
	] = useState<string>('')
	const [
		isEdit,
		setIsEdit
	] = useState<boolean>(false)
	const [
		title,
		setTitle
	] = useState<string>('')
	const [
		visibleModal,
		setVisibleModal
	] = useState<boolean>(false)

	useEffect(() => {
		loadCategories()
	}, [])

	const loadCategories = async () => {
		try {
			const data = await categoryApi()
			setCategories(data)
		} catch (error) {
			console.error('Failed to load categories:', error)
		}
	}

	const handleDeleteCategory = async (categoryId: string) => {
		try {
			await deleteCategory(categoryId)
			await loadCategories()
			toast.success('You delete category')
		} catch (error) {
			console.error('Failed to delete category:', error)
		}
	}

	const handleCloseModal = async () => {
		setVisibleModal(false)
		setIsEdit(false)
		await loadCategories()
	}

	return (
		<>
			<div className={'mt-10 p-4 rounded-md bg-slate-800'}>
				<h1>Your category list:</h1>
				<div className={'mt-2 flex flex-wrap items-center gap-2'}>
					{categories.map((category, idx) => (
						<div
							key={idx}
							className={
								'group ' +
								'py-2 ' +
								'px-4 ' +
								'rounded-lg ' +
								'bg-blue-600 ' +
								'flex ' +
								'items-center ' +
								'relative ' +
								'gap'
							}
						>
							{category.title}
							<div
								className={
									'absolute ' +
									'px-3 ' +
									'hidden ' +
									'left-0 ' +
									'top-0 ' +
									'bottom-0 ' +
									'right-0 ' +
									'rounded-lg ' +
									'bg-black/90 ' +
									'items-center ' +
									'justify-between ' +
									'group-hover:flex'
								}
							>
								<button onClick={() => {
									setCategoryId(category.id)
									setVisibleModal(true)
									setIsEdit(true)
									setTitle(category.title)
								}}>
									<AiFillEdit />
								</button>
								<button
									onClick={() => handleDeleteCategory(category.id)}
								>
									<AiFillCloseCircle />
								</button>
							</div>
						</div>
					))}
				</div>

				<button
					onClick={() => setVisibleModal(true)}
					className={
						'max-w-fit ' +
						'flex ' +
						'items-center ' +
						'gap-2 ' +
						'text-white/50 ' +
						'mt-5 ' +
						'hover:text-white'
					}
				>
					<FaPlus />
					<span>
						Create a new category
					</span>
				</button>
			</div>

			{visibleModal && (
				<CategoryModal
					type={isEdit ? 'patch' : 'post'}
					id={isEdit ? categoryId : undefined}
					setVisibleModal={handleCloseModal}
					title={isEdit ? title : ''}
				/>
			)}
		</>
	)
}

export default Categories