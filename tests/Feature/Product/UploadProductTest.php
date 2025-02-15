<?php

use App\Models\User;

test('UploadProduct screen can be rendered', function () {
    $this->seed();

    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/products/upload');

    $response->assertOk();
});
