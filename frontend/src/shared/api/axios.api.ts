import axios, { type AxiosInstance } from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api'

const api: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
})

export default api
