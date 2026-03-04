<script setup lang="ts">
import type { PaginationMeta } from '@/types/pagination.types'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from '@/ui/pagination'
import { computed, ref } from 'vue'

const props = defineProps<{
	pagination: PaginationMeta
}>()

const emits = defineEmits<{
	loadNewPage: [page: number]
}>()

const currentPage = computed(() => props.pagination.current_page)

const handlePageChange = (page: number) => {
	emits('loadNewPage', page)
}
</script>

<template>
	<Pagination
		v-slot="{ page }"
		:items-per-page="pagination.per_page"
		:total="pagination.total"
		:page="currentPage"
		@update:page="handlePageChange"
	>
		<PaginationContent v-slot="{ items }">
			<PaginationPrevious />

			<template v-for="(item, index) in items" :key="index">
				<PaginationItem
					v-if="item.type === 'page'"
					:value="item.value"
					:is-active="item.value === currentPage"
				>
					{{ item.value }}
				</PaginationItem>
			</template>

			<PaginationEllipsis :index="4" />

			<PaginationNext />
		</PaginationContent>
	</Pagination>
</template>
