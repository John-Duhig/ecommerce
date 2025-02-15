<?php

use App\Models\User;

test('Edit product can be rendered', function () {
    $this->seed();

    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/products/1');

    $response = $this->get('/products/1');

    $response->assertOk();
});
