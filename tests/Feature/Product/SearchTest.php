<?php

use Database\Seeders\ProductSeeder;

test('Search screen can be rendered', function () {
    $this->seed(ProductSeeder::class);
    $response = $this->get('/products/search');

    $response->assertStatus(200);

    $response = $this->get('/products?query=e');

    $response->assertStatus(200);
});
