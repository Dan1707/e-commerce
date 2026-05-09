<script lang="ts" setup>
import { useProducts } from '@/shared/composables/useProducts'
import { Input } from '@/ui/input'
import { Search } from 'lucide-vue-next'
import { ref } from 'vue'

const { searchQuery } = useProducts()
</script>

<template>
	<!-- Search -->
	<div
		class="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4"
	>
		<div class="relative">
			<Search
				class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500 pointer-events-none"
			/>
			<Input
				v-model="searchQuery"
				placeholder="Search products..."
				class="pl-9 bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700"
			/>
		</div>
	</div>
</template>
