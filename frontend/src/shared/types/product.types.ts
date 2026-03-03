export interface Price {
	original: number
	sale: number | null
	formatted: string
	on_sale: boolean
}

export interface Product {
	id: number
	name: string
	description: string
	price: Price
	category: string
	brand: string
	image: string
	is_active: 0 | 1
	created_at: string
	updated_at: string
}
