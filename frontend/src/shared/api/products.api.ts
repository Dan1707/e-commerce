import type { Product } from '@/types/product.types'
import api from './axios.api'
import type { AxiosResponse } from 'axios'

export const getProducts = async (params: {
	page?: number
	search?: string
}): Promise<AxiosResponse> => {
	return api.get('/products', { params }).then(response => response)
}
