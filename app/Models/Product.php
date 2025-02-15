<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'price',
        'rating',
        'user_id',
    ];
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
