<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ProductController::class, 'index'])->name('home');

Route::prefix('/products')->group(function () {
    // View all products
    Route::get('/', [ProductController::class, 'index'])->name(
        'products.viewAll'
    );
    // Upload page
    Route::middleware('auth')
        ->get('/upload', [ProductController::class, 'create'])
        ->name('products.create');
    // Save uploaded product to database
    Route::middleware('auth')
        ->post('/upload', [ProductController::class, 'store'])
        ->name('products.store');
    // Update a product
    Route::middleware('auth')
        ->post('/{id}', [ProductController::class, 'update'])
        ->name('products.update');
    // Delete uploaded product from database
    Route::middleware('auth')
        ->delete('/{id}', [ProductController::class, 'destroy'])
        ->name('products.destroy');
    // Search for products
    Route::get('/search', [ProductController::class, 'search'])->name(
        'products.search'
    );
    // View a single product
    Route::get('/{id}', [ProductController::class, 'show'])->name(
        'products.viewOne'
    );
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name(
        'profile.edit'
    );
    Route::patch('/profile', [ProfileController::class, 'update'])->name(
        'profile.update'
    );
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name(
        'profile.destroy'
    );
});

require __DIR__ . '/auth.php';
