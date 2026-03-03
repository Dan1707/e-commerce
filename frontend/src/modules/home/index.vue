<script lang="ts" setup>
import { productCard } from '@/components/product-card'
import { ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { Loader } from '@/ui/loader'
import ProductCard from '@/shared/components/product-card/productCard.vue'
import type { Product } from '@/types/product.types'
import ProductFilters from './components/product-filters/productFilters.vue'

const products = ref<Product[]>()
const isLoading = ref()

const getProducts = async () => {
	try {
		isLoading.value = true

		const res = await axios.get('http://backend.test/api/products')

		products.value = res.data.data
	} catch (error) {
		console.log(error)
	} finally {
		isLoading.value = false
	}
}

onMounted(async () => {
	await getProducts()
})
</script>

<template>
	<section>
		<Loader v-if="isLoading" />

		<div
			v-else
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mx-auto container"
		>
			<ProductCard
				v-for="product in products"
				:key="product.id"
				:product="product"
			/>
		</div>
	</section>
</template>
