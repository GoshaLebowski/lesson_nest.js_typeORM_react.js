import { FC } from 'react'
import { FaTrash } from 'react-icons/fa'
import { ITransactionResponse } from '../types/types'
import { formatDate } from '../helpers/date.helper'
import { formatToUSD } from '../helpers/currency.helper'
import ReactPaginate from 'react-paginate'

interface TransactionTableProps {
	data: ITransactionResponse[];
	totalPages: number;
	onPageChange: (selectedItem: { selected: number }) => void;
	currentPage: number;
	handleDeleteTransaction: (transactionId: string) => Promise<void>;
}

const TransactionTable: FC<TransactionTableProps> = (
	{
		data,
		totalPages,
		onPageChange,
		currentPage,
		handleDeleteTransaction
	}) => {
	const forcePage = Math.min(currentPage - 1, totalPages - 1)

	return (
		<>
			<ReactPaginate
				className="flex gap-3 justify-end mt-4 items-center"
				activeClassName="bg-blue-600 rounded-md"
				pageLinkClassName="text-white text-xs py-1 px-2 rounded-sm"
				previousClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
				nextClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
				disabledClassName="text-white/50 cursor-not-allowed"
				disabledLinkClassName="text-slate-600 cursor-not-allowed"
				pageCount={totalPages}
				pageRangeDisplayed={1}
				marginPagesDisplayed={2}
				onPageChange={onPageChange}
				forcePage={forcePage}
				previousLabel={'<'}
				nextLabel={'>'}
			/>
			<div className="bg-slate-800 px-4 py-3 mt-4 rounded-md">
				<table className="w-full">
					<thead>
					<tr>
						<td className="font-bold">Name</td>
						<td className="font-bold">Amount($)</td>
						<td className="font-bold">Category</td>
						<td className="font-bold">Date</td>
						<td className="text-right font-bold">Action</td>
					</tr>
					</thead>
					<tbody>
					{data.length ? (
						data.map((transaction, idx) => (
							<tr key={idx}>
								<td>{transaction.title}</td>
								<td className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}>
									{transaction.type === 'income' ? `${formatToUSD.format(transaction.amount)}` : `- ${formatToUSD.format(transaction.amount)}`}
								</td>
								<td>{transaction.category?.title || 'Другое'}</td>
								<td>{formatDate(transaction.createdAt)}</td>
								<td>
									<button
										className="btn hover:btn-red ml-auto"
										onClick={() => handleDeleteTransaction(transaction.id)}
									>
										<FaTrash />
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={5} className="text-center py-10 text-base" style={{ textTransform: 'none' }}>
								While there are no transactions, you need to create them
							</td>
						</tr>
					)}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default TransactionTable