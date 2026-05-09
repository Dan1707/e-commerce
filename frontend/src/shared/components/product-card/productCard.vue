<script setup lang="ts">
import { Heart, ShoppingCart } from 'lucide-vue-next'
import Button from '../ui/button/Button.vue'
import type { Product } from '@/types/product.types'

defineProps<{
	product: Product
}>()
</script>

<template>
	<div
		class="group relative border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-white border-slate-200 hover:border-slate-300 hover:shadow-slate-200/80 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-600 h-96 dark:hover:shadow-black/50"
	>
		<!-- Sale badge -->
		<div
			v-if="product.price.on_sale"
			class="absolute top-3 left-3 z-10 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full tracking-wide"
		>
			SALE
		</div>

		<!-- Wishlist button -->
		<button
			class="absolute top-3 right-3 z-10 w-8 h-8 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 bg-white/80 hover:bg-slate-100 dark:bg-zinc-800/80 dark:hover:bg-zinc-700"
		>
			<Heart
				class="w-4 h-4 transition-colors text-slate-400 hover:text-rose-500 dark:text-zinc-400 dark:hover:text-rose-400"
			/>
		</button>

		<!-- Image -->
		<div
			class="relative overflow-hidden aspect-[4/3] bg-slate-100 dark:bg-zinc-800"
		>
			<img
				:src="product.image"
				:alt="product.name"
				class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
			/>
		</div>

		<!-- Content -->
		<div class="p-4 flex flex-col gap-3">
			<!-- Category & Brand -->
			<div class="flex items-center justify-between">
				<span
					class="text-xs uppercase tracking-widest font-medium text-slate-400 dark:text-zinc-500"
				>
					{{ product.category }}
				</span>
				<span
					class="text-xs truncate max-w-[120px] text-slate-400 dark:text-zinc-600"
				>
					{{ product.brand }}
				</span>
			</div>

			<!-- Name -->
			<h3
				class="font-semibold text-sm leading-snug line-clamp-2 text-slate-900 group-hover:text-slate-700 dark:text-white dark:group-hover:text-zinc-100"
			>
				{{ product.name }}
			</h3>

			<!-- Description -->
			<p
				class="text-xs leading-relaxed line-clamp-2 text-slate-400 dark:text-zinc-500"
			>
				{{ product.description }}
			</p>

			<!-- Price + Cart -->
			<div class="flex items-center justify-between pt-1 mt-auto">
				<div class="flex flex-col">
					<span
						v-if="product.price.on_sale"
						class="text-xs line-through text-slate-400 dark:text-zinc-500"
					>
						{{ product.price.formatted }}
					</span>
					<span class="font-bold text-lg text-slate-900 dark:text-white">
						{{
							product.price.on_sale
								? `$${product.price.sale}`
								: product.price.formatted
						}}
					</span>
				</div>

				<Button>
					<ShoppingCart class="w-4 h-4" />
					Add
				</Button>
			</div>
		</div>
	</div>
</template>
