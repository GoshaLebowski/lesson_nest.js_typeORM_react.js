import { FC, useEffect, useState } from 'react'
import TransactionForm from '../components/TransactionForm'
import TransactionTable from '../components/TransactionTable'
import { ITransactionResponse } from '../types/types'
import { useLocation, useNavigate } from 'react-router-dom'
import { deleteTransaction, transactionApi, transPagination } from '../api/api.transactions'
import { formatToUSD } from '../helpers/currency.helper.ts'
import { toast } from 'react-toastify'
import Chart from '../components/Chart.tsx'

interface ITransactions {
	limit: number;
}

const Transactions: FC<ITransactions> = ({ limit }) => {
	const location = useLocation()
	const navigate = useNavigate()

	const queryParams = new URLSearchParams(location.search)
	const pageFromUrl = parseInt(queryParams.get('page') || '1', 10)

	const [data, setData] = useState<ITransactionResponse[]>([])
	const [currentPage, setCurrentPage] = useState<number>(pageFromUrl)
	const [totalPages, setTotalPages] = useState<number>(0)

	const [totalIncome, setTotalIncome] = useState<number>(0)
	const [totalExpense, setTotalExpense] = useState<number>(0)

	const calculateTotals = (transaction: ITransactionResponse[]) => {
		const income = transaction.reduce(
			(acc, transaction) =>
				acc + (transaction.type === 'income' ? transaction.amount : 0), 0)
		const expense = transaction.reduce(
			(acc, transaction) =>
				acc + (transaction.type === 'expense' ? transaction.amount : 0), 0)
		setTotalIncome(income)
		setTotalExpense(expense)
	}

	const loadPagination = async (page: number) => {
		try {
			const data = await transPagination(
				page,
				limit
			)
			setData(data)

			const transApi = await transactionApi()
			calculateTotals(transApi)

			setTotalPages(Math.ceil(transApi.length / limit))
			navigate(`?page=${page}`, { replace: true })
		} catch (error) {
			console.error('Failed to load transactions:', error)
		}
	}

	const handlePageChange = (selectedItem: { selected: number }) => {
		setCurrentPage(selectedItem.selected + 1)
	}

	useEffect(() => {
		loadPagination(currentPage)
	}, [currentPage])

	const handleDeleteTransaction = async (transactionId: string) => {
		try {
			await deleteTransaction(transactionId)
			const transApi = await transactionApi()
			const updatedTotalPages = Math.ceil(transApi.length / limit)
			setTotalPages(updatedTotalPages)
			const data = await transPagination(
				currentPage,
				limit
			)
			if (data.length === 0 && currentPage > 1) {
				setCurrentPage((
					prevPage
				) => Math.max(prevPage - 1, 1))
			} else {
				setData(data)
			}
			calculateTotals(transApi)
			toast.success('You deleted a transaction')
		} catch (error) {
			console.error('Failed to delete transaction:', error)
		}
	}

	return (
		<>
			<div className="grid grid-cols-3 gap-4 mt-4 items-start">
				<div className="grid col-span-2">
					<TransactionForm
						loadPagination={loadPagination}
						currentPage={currentPage}
					/>
				</div>
				<div className="rounded-md bg-slate-800 p-3">
					<div className="grid grid-cols-2 gap-3">
						<div>
							<p className="uppercase text-md font-bold text-center">
								Total Income
							</p>
							<p className="bg-green-600 p-1 rounded-sm text-center mt-2">
								{
									formatToUSD.format(totalIncome)
								}
							</p>
						</div>
						<div>
							<p className="uppercase text-md font-bold text-center">
								Total Expense:
							</p>
							<p className="bg-red-500 p-1 rounded-sm text-center mt-2">
								{
									formatToUSD.format(totalExpense)
								}
							</p>
						</div>
					</div>
					<>
						<Chart totalIncome={totalIncome} totalExpense={totalExpense} />
					</>
				</div>
			</div>

			<h1 className="my-5">
				<TransactionTable
					data={data}
					handleDeleteTransaction={handleDeleteTransaction}
					currentPage={currentPage}
					onPageChange={handlePageChange}
					totalPages={totalPages}
				/>
			</h1>
		</>
	)
}

export default Transactions