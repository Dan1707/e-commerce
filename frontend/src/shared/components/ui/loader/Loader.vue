<template>
	<div
		class="flex items-center justify-center bg-slate-50 dark:bg-zinc-950 transition-colors duration-300"
		:class="
			fullscreen ? 'fixed inset-0 z-[99999]' : 'w-full h-full min-h-[200px]'
		"
	>
		<div class="flex flex-col items-center gap-4">
			<!-- Spinner -->
			<div class="relative w-10 h-10">
				<div
					class="absolute inset-0 rounded-full border-2 border-slate-200 dark:border-zinc-800"
				/>
				<div
					class="absolute inset-0 rounded-full border-2 border-transparent border-t-slate-900 dark:border-t-white animate-spin"
				/>
			</div>

			<!-- Label -->
			<span
				v-if="label"
				class="text-xs uppercase tracking-widest font-medium text-slate-400 dark:text-zinc-500"
			>
				{{ label }}
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		label?: string
		fullscreen?: boolean
	}>(),
	{
		label: 'Loading',
		fullscreen: true,
	},
)
</script>
