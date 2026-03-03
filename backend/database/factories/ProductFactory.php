<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
   {
        $name = fake()->unique()->words(3, true);
        $price = fake()->randomFloat(2, 5, 999);

        return [
            'name'        => ucwords($name),
            'description' => fake()->paragraphs(2, true),
            'price'       => $price,
            'sale_price'  => fake()->boolean(30)  // 30% chance of sale
                                ? round($price * fake()->randomFloat(2, 0.5, 0.9), 2)
                                : null,
            'category'    => fake()->randomElement([
                                'Electronics', 'Clothing', 'Books',
                                'Home & Garden', 'Sports', 'Toys'
                             ]),
            'brand'       => fake()->company(),
            'image'       => fake()->imageUrl(640, 480, 'products'),
            'is_active'   => fake()->boolean(85),  // 85% active
        ];
    }
}
