<script lang="ts" setup>
import { ref } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'

const isDark = ref(false)
</script>

<template>
	<!-- Theme toggle -->
	<div class="flex justify-end max-w-7xl mx-auto">
		<button
			@click="isDark = !isDark"
			:class="
				isDark
					? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
					: 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
			"
			class="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200"
		>
			<Sun v-if="isDark" class="w-4 h-4" />
			<Moon v-else class="w-4 h-4" />
			{{ isDark ? 'Light mode' : 'Dark mode' }}
		</button>
	</div>
</template>
