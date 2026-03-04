<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { Loader } from '@/ui/loader'
import ProductCard from '@/shared/components/product-card/productCard.vue'
import type { Product } from '@/types/product.types'
import ProductFilters from './components/product-filters/productFilters.vue'
import MyPagination from '@/components/my-pagination/myPagination.vue'
import type { PaginationMeta } from '@/types/pagination.types'

const products = ref<Product[]>()
const isLoading = ref(false)
const paginationMeta = ref<PaginationMeta>()

const route = useRoute()
const router = useRouter()

const getProducts = async (page: number | null = null) => {
	try {
		isLoading.value = true

		const res = await axios.get(`http://backend.test/api/products`, {
			params: page ? { page } : {},
		})

		if (res.status === 200) return res
	} catch (error) {
	} finally {
		isLoading.value = false
	}
}

const getPaginationData = async (page: number) => {
	try {
		isLoading.value = true
		const res = await getProducts(page)

		if (res) {
			paginationMeta.value = res.data.meta
			products.value = res.data.data
		}
	} catch (error) {
	} finally {
		isLoading.value = false
	}
}

onMounted(async () => {
	if (!route.query.page) {
		await router.push({ query: { page: 1 } })
	}

	await getPaginationData(Number(route.query.page))
})

const updatePage = async (page: number) => {
	await router.push({ query: { page } })
	await getPaginationData(page)
}
</script>

<template>
	<section>
		<Loader v-if="isLoading" />

		<div class="container" v-else>
			<div class="flex justify-between mt-8 gap-6">
				<ProductFilters
					class="sticky top-20"
					:categories="[
						'Electronics',
						'Clothing',
						'Toys',
						'Sports',
						'Books',
						'Home & Garden',
					]"
					:category-counts="{ Electronics: 12, Clothing: 8, Toys: 3 }"
				/>
				<div
					class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto"
				>
					<ProductCard
						v-for="product in products"
						:key="product.id"
						:product="product"
					/>
				</div>
			</div>
			<MyPagination
				v-if="paginationMeta"
				:pagination="paginationMeta as PaginationMeta"
				@loadNewPage="updatePage"
				class="mt-8"
			/>
		</div>
	</section>
</template>
