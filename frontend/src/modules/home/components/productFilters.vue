<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { Search, X } from 'lucide-vue-next'
import { Input } from '@/ui/input'
import { Button } from '@/ui/button'
import SearchBar from './searchBar.vue'

const props = defineProps<{
	categories: string[]
	categoryCounts?: Record<string, number>
}>()

const emit = defineEmits<{
	change: [filters: typeof filters]
}>()

const PRICE_MIN = 0
const PRICE_MAX = 1000

const filters = reactive({
	search: '',
	priceMin: PRICE_MIN,
	priceMax: PRICE_MAX,
	category: 'all',
})

const minPercent = computed(
	() => ((filters.priceMin - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100,
)
const maxPercent = computed(
	() => ((filters.priceMax - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100,
)

watch(
	() => filters.priceMin,
	val => {
		if (val > filters.priceMax) filters.priceMin = filters.priceMax
	},
)
watch(
	() => filters.priceMax,
	val => {
		if (val < filters.priceMin) filters.priceMax = filters.priceMin
	},
)

const hasActiveFilters = computed(
	() =>
		filters.search !== '' ||
		filters.priceMin !== PRICE_MIN ||
		filters.priceMax !== PRICE_MAX ||
		filters.category !== 'all',
)

function resetFilters() {
	filters.search = ''
	filters.priceMin = PRICE_MIN
	filters.priceMax = PRICE_MAX
	filters.category = 'all'
}

watch(filters, () => emit('change', { ...filters }), { deep: true })
</script>
<template>
	<aside class="w-72 shrink-0 flex flex-col gap-4">
		<!-- Search -->
		<SearchBar
			@nameToSearch="
				(nameToSearch: string) => {
					filters.search = nameToSearch
				}
			"
		/>

		<!-- Categories -->
		<div
			class="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col gap-3"
		>
			<h3
				class="text-xs uppercase tracking-widest font-medium text-slate-400 dark:text-zinc-500"
			>
				Categories
			</h3>
			<ul class="flex flex-col gap-1">
				<li v-for="cat in categories" :key="cat">
					<button
						@click="filters.category = filters.category === cat ? 'all' : cat"
						:class="
							filters.category === cat
								? 'bg-slate-900 text-white dark:bg-white dark:text-zinc-900'
								: 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
						"
						class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150"
					>
						<span>{{ cat }}</span>
						<span
							:class="
								filters.category === cat
									? 'bg-white/20 text-white dark:bg-black/20 dark:text-zinc-900'
									: 'bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500'
							"
							class="text-xs px-1.5 py-0.5 rounded-md font-mono"
						>
							{{ categoryCounts[cat] ?? 0 }}
						</span>
					</button>
				</li>
			</ul>
		</div>

		<!-- Price range -->
		<div
			class="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col gap-4"
		>
			<div class="flex items-center justify-between">
				<h3
					class="text-xs uppercase tracking-widest font-medium text-slate-400 dark:text-zinc-500"
				>
					Price
				</h3>
				<span class="text-xs font-mono text-slate-500 dark:text-zinc-400">
					${{ filters.priceMin }} — ${{ filters.priceMax }}
				</span>
			</div>

			<!-- Slider -->
			<div class="relative h-5 flex items-center px-1">
				<div
					class="absolute inset-x-1 h-1 rounded-full bg-slate-200 dark:bg-zinc-700"
				/>
				<div
					class="absolute h-1 rounded-full bg-slate-900 dark:bg-white"
					:style="{
						left: `calc(${minPercent}% + 4px)`,
						right: `calc(${100 - maxPercent}% + 4px)`,
					}"
				/>
				<input
					v-model.number="filters.priceMin"
					type="range"
					:min="PRICE_MIN"
					:max="PRICE_MAX"
					:step="10"
					class="price-thumb absolute inset-x-0"
				/>
				<input
					v-model.number="filters.priceMax"
					type="range"
					:min="PRICE_MIN"
					:max="PRICE_MAX"
					:step="10"
					class="price-thumb absolute inset-x-0"
				/>
			</div>

			<!-- Min/Max inputs -->
			<div class="flex items-center gap-2">
				<div class="relative flex-1">
					<span
						class="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 dark:text-zinc-500"
						>$</span
					>
					<Input
						v-model.number="filters.priceMin"
						type="number"
						:min="PRICE_MIN"
						:max="filters.priceMax"
						class="pl-6 text-sm bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700"
					/>
				</div>
				<span class="text-slate-300 dark:text-zinc-700">—</span>
				<div class="relative flex-1">
					<span
						class="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 dark:text-zinc-500"
						>$</span
					>
					<Input
						v-model.number="filters.priceMax"
						type="number"
						:min="filters.priceMin"
						:max="PRICE_MAX"
						class="pl-6 text-sm bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700"
					/>
				</div>
			</div>
		</div>

		<!-- Reset -->
		<Button
			variant="outline"
			:disabled="!hasActiveFilters"
			class="w-full rounded-xl border-slate-200 dark:border-zinc-800 text-slate-400 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30"
			@click="resetFilters"
		>
			<X class="w-4 h-4 mr-2" />
			Reset filters
		</Button>
	</aside>
</template>

<style scoped>
.price-thumb {
	width: 100%;
	appearance: none;
	background: transparent;
	pointer-events: none;
}
.price-thumb::-webkit-slider-thumb {
	pointer-events: all;
	appearance: none;
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background: white;
	border: 2px solid #0f172a;
	cursor: pointer;
	transition: transform 0.15s;
}
.price-thumb::-webkit-slider-thumb:hover {
	transform: scale(1.2);
}
.dark .price-thumb::-webkit-slider-thumb {
	background: #18181b;
	border-color: white;
}
</style>
