import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/localstorage.helpers.ts'

export const instance = axios.create({
	baseURL: 'http://127.0.0.1:5000/api',
	headers: {
		Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
	}
})