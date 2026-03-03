import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: () => import('@/shared/components/layout/defaultLayout.vue'),
			children: [
				{
					path: '/',
					component: () => import('@/modules/home/index.vue'),
				},
			],
		},
	],
})

export default router
