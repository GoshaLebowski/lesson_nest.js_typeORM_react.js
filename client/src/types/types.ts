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