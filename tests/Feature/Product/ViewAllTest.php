<?php

use App\Models\User;

test('ViewAll screen can be rendered', function () {
    $response = $this->get('/products');

    $response->assertStatus(200);

    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/products');

    $response->assertOk();
});
