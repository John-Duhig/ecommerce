<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Log;

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
        $random = fake()->numberBetween(1, 5);
        $filePath = "{$random}.jpg";
        return [
            'title' => fake()->name(),
            'user_id' => 1,
            'description' => fake()->realText(),
            'image' => $filePath,
            'price' => fake()->randomFloat(1, 1, 5),
            'rating' => fake()->randomFloat(1, 1, 5),
        ];
    }
}
