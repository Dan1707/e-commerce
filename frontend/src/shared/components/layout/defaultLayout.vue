<script lang="ts" setup>
import DefaultHeader from './defaultHeader.vue'
</script>

<template>
	<div class="flex flex-col min-h-screen">
		<DefaultHeader />
		<main class="min-h-full py-8 transition-colors duration-300">
			<RouterView></RouterView>
		</main>
	</div>
</template>
