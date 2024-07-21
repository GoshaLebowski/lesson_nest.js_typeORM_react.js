export interface IUser {
	id: string
	email: string
	token: string
}

export interface IUserData {
	email: string;
	password: string;
}

export interface IResponseUser {
	email: string
	id: string
	createdAt: string
	updatedAt: string
}

export interface IResponseUserData {
	token: string;
	user: IResponseUser
}

export interface ICategory {
	title: string
	id: string
	createdAt: string
	updatedAt: string
	transactions: []
}

export interface ITransactionCreate {
	title: string
	amount: number
	type: string
	category: {
		id: string
	}
}

export interface ITransactionResponse {
	id: string
	title: string
	type: string
	amount: number
	createdAt: string
	updatedAt: string
	category: {
		id: string
		title: string
		createdAt: string
		updatedAt: string
	}
}

export interface IFormDataTransaction {
	title: string
	amount: number | ''
	type: 'income' | 'expense' | ''
	category: string,
}