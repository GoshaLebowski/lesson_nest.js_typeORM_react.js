import React, { FC, useState } from 'react'
import { AuthService } from '../services/auth.service.ts'
import { toast } from 'react-toastify'
import { setTokenToLocalStorage } from '../helpers/localstorage.helpers.ts'
import { useAppDispatch } from '../store/hooks.ts'
import { login } from '../store/user/userSlice.ts'
import { useNavigate } from 'react-router-dom'

const Auth: FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLogin, setIsLogin] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.login({ email, password })
			if (data) {
				setTokenToLocalStorage('token', data.token)
				dispatch(login(data))
				toast.success('You logged in')
				navigate('/')
			}
		} catch (err: any) {
			const error = err.response?.data?.message
			toast.error(error.toString())
		}
	}

	const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.registration({ email, password })
			if (data) {
				toast.success('The account has been created.')
				setIsLogin(!isLogin)
			}
		} catch (err: any) {
			const error = err.response?.data?.message
			toast.error(error.toString())
		}
	}

	return (
		<div className={'mt-40 flex-col justify-center items-center bg-slate-900 text-white'}>
			<h1 className={'text-center text-xl mb-10'}>
				{isLogin ? 'Login' : 'Registration'}
			</h1>

			<form
				onSubmit={isLogin ? loginHandler : registrationHandler}
				className={'flex w-1/3 flex-col mx-auto gap-5'}
			>
				<input
					type={'text'}
					className={'input'}
					placeholder={'Email'}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type={'password'}
					className={'input'}
					placeholder={'Password'}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button className={'btn btn-green mx-auto'}>
					Submit
				</button>
			</form>

			<div className={'flex justify-center mt-5'}>
				{
					isLogin ? (
						<button
							onClick={() => setIsLogin(!isLogin)}
							className={'text-slate-300 hover:text-white'}>
							You don't have an account?
						</button>
					) : (
						<button
							onClick={() => setIsLogin(!isLogin)}
							className={'text-slate-300 hover:text-white'}>
							Already have an account ?
						</button>
					)
				}
			</div>
		</div>
	)
}

export default Auth