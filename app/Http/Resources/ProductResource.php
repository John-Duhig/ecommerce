<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class ProductResource extends JsonResource
{
    /*
     * Transform resource to array
     *
     * @return array<string, mixed>
     *
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'image' => asset('storage/products/' . $this->image),
            'description' => $this->description,
            'rating' => $this->rating,
            'price' => $this->price,
        ];
    }
}
