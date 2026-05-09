<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { Loader } from '@/ui/loader'
import ProductCard from '@/shared/components/product-card/productCard.vue'
import ProductFilters from './components/productFilters.vue'
import MyPagination from '@/components/my-pagination/myPagination.vue'
import { useProducts } from '@/shared/composables/useProducts'
import { onMounted } from 'vue'

const router = useRouter()

const {
	isLoading,
	products,
	paginationMeta,
	searchQuery,
	currentPage,
	fetchProducts,
} = useProducts()

const updatePage = async (page: number) => {
	currentPage.value = page
	await router.push({ query: { page } })
}

onMounted(() => {
	fetchProducts()
})
</script>

<template>
	<section>
		<Loader v-if="isLoading" />

		<div class="container" v-else>
			<div class="flex justify-between mt-8 gap-6">
				<ProductFilters
					class="sticky top-20"
					v-model:search="searchQuery"
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
				v-if="paginationMeta && paginationMeta.total >= 10"
				:pagination="paginationMeta"
				@loadNewPage="updatePage"
				class="mt-8"
			/>
		</div>
	</section>
</template>
