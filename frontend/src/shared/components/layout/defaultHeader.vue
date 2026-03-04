<script lang="ts" setup>
import { Button } from '@/ui/button'
import { Heart, ShoppingBag, ShoppingCart } from 'lucide-vue-next'
</script>

<template>
	<header class="border-b border-gray-600/20 sticky top-0 z-[9999] bg-white">
		<div class="container flex items-center justify-between py-4">
			<div class="flex items-center gap-2 text-xl">
				<ShoppingBag :size="36" />
				E-Commerce
			</div>
			<nav class="max-w-70 w-full">
				<ul class="flex items-center justify-between gap-3 w-full">
					<li><a href="#" class="font-semibold">Home</a></li>
					<li><a href="#" class="font-semibold">Categories</a></li>
					<li><a href="#" class="font-semibold">Blog</a></li>
				</ul>
			</nav>
			<div class="flex items-center gap-4">
				<div class="space-x-2">
					<Button variant="ghost"><Heart /></Button>
					<Button variant="ghost"><ShoppingCart /></Button>
				</div>
				<div class="space-x-2">
					<Button variant="link">Login</Button>
					<Button>Sign Up</Button>
				</div>
			</div>
		</div>
	</header>
</template>
