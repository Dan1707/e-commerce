import { watchDebounced } from '@vueuse/core'
import { ref, watch } from 'vue'
import { getProducts } from '@/api/products.api'
import type { PaginationMeta } from '@/types/pagination.types'
import type { Product } from '@/types/product.types'

const products = ref<Product[]>([])
const currentPage = ref(1)
const paginationMeta = ref<PaginationMeta>()
const searchQuery = ref('')

export const useProducts = () => {
	const isLoading = ref(false)

	const fetchProducts = async () => {
		try {
			isLoading.value = true
			const res = await getProducts({
				page: currentPage.value,
				search: searchQuery.value || undefined,
			})
			products.value = res.data.data
			paginationMeta.value = res.data.meta
		} catch (error) {
			console.log(error)
		} finally {
			isLoading.value = false
		}
	}

	watchDebounced(
		searchQuery,
		() => {
			currentPage.value = 1
			fetchProducts()
		},
		{ debounce: 400 },
	)

	watch(currentPage, fetchProducts)

	return {
		fetchProducts,
		isLoading,
		products,
		paginationMeta,
		searchQuery,
		currentPage,
	}
}
