import { FC } from 'react'
import { Cell, Legend, Pie, PieChart } from 'recharts'

const COLORS = ['rgb(22,163,74)', 'rgb(239 68 68)']

interface IChart {
	totalIncome: number
	totalExpense: number
}

interface IData {
	value: number
	name: string
}

const Chart: FC<IChart> = ({ totalExpense, totalIncome }) => {
	const data = new Array<IData>(
		{ value: totalIncome, name: 'Income' },
		{ value: totalExpense, name: 'Expense' }
	)
	return (
		<div>
			<PieChart width={240} height={262}>
				<Pie
					data={data}
					cx={'50%'}
					cy={'50%'}
					innerRadius={60}
					outerRadius={80}
					fill="#8884d8"
					paddingAngle={2}
					dataKey="value"
				>
					{data.map((_entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Legend />
			</PieChart>
		</div>
	)
}

export default Chart