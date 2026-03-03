<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { Search, X } from 'lucide-vue-next'
import { Input } from '@/ui/input'
import { Button } from '@/ui/button'
import { Separator } from '@/ui/separator'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/ui/select'

const props = defineProps<{
	categories: string[]
}>()

const emit = defineEmits<{
	change: [filters: typeof filters]
}>()

const filters = reactive({
	search: '',
	priceMin: null as number | null,
	priceMax: null as number | null,
	category: 'all',
})

const hasActiveFilters = computed(
	() =>
		filters.search !== '' ||
		filters.priceMin !== null ||
		filters.priceMax !== null ||
		filters.category !== 'all',
)

function resetFilters() {
	filters.search = ''
	filters.priceMin = null
	filters.priceMax = null
	filters.category = 'all'
	emit('change', { ...filters })
}

watch(filters, () => emit('change', { ...filters }), { deep: true })
</script>

<template>
	<div
		class="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl px-5 py-4"
	>
		<div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
			<!-- Search -->
			<div class="relative flex-1 min-w-[180px]">
				<Search
					class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500 pointer-events-none"
				/>
				<Input
					v-model="filters.search"
					placeholder="Search products..."
					class="pl-9 bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700"
				/>
			</div>

			<Separator orientation="vertical" class="hidden sm:block h-8" />

			<!-- Price range -->
			<div class="flex items-center gap-2 min-w-[200px]">
				<Input
					v-model.number="filters.priceMin as number"
					type="number"
					placeholder="Min $"
					class="w-24 bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-sm"
				/>
				<span class="text-slate-400 dark:text-zinc-600 text-sm shrink-0"
					>—</span
				>
				<Input
					v-model.number="filters.priceMax as number"
					type="number"
					placeholder="Max $"
					class="w-24 bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-sm"
				/>
			</div>

			<Separator orientation="vertical" class="hidden sm:block h-8" />

			<!-- Category -->
			<Select v-model="filters.category">
				<SelectTrigger
					class="w-full sm:w-[180px] bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700"
				>
					<SelectValue placeholder="All categories" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All categories</SelectItem>
					<SelectItem v-for="cat in categories" :key="cat" :value="cat">
						{{ cat }}
					</SelectItem>
				</SelectContent>
			</Select>

			<Separator orientation="vertical" class="hidden sm:block h-8" />

			<!-- Reset -->
			<Button
				variant="ghost"
				size="sm"
				:disabled="!hasActiveFilters"
				class="shrink-0 text-slate-400 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30"
				@click="resetFilters"
			>
				<X class="w-4 h-4 mr-1.5" />
				Reset
			</Button>
		</div>
	</div>
</template>
