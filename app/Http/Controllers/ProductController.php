<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user) {
            $products = $user->paginated();
        } else {
            $products = Product::orderBy('id', 'desc')->paginate(8);
        }

        return Inertia::render('Product/ViewAll', [
            'pagination' => ProductResource::collection($products),
        ]);
    }

    public function show($id)
    {
        $product = Product::find($id);

        $product->image = asset('storage/products/' . $product->image);

        return Inertia::render('Product/ViewOne', ['product' => $product]);
    }

    public function search()
    {
        $query = Product::where('title', 'like', '%' . request('query') . '%');

        return Inertia::render('Product/Search', [
            'pagination' => ProductResource::collection($query->paginate(8)),
        ]);
    }

    public function create()
    {
        return Inertia::render('Product/UploadProduct');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|mimes:jpg,png|max:2048',
            'rating' => 'numeric|min:1|max:5',
            'price' => 'numeric|min:1',
        ]);

        $file = $request->file('image')->store('products', options: 'public');
        $path = explode('/', $file);

        $product = new Product([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $path[1],
            'rating' => $request->rating,
            'price' => $request->price,
            'user_id' => $request->user()->id,
        ]);

        $product->save();

        return redirect(route('products.viewAll', absolute: false));
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'id' => 'required|numeric',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|mimes:jpg,png|max:2048',
            'rating' => 'numeric|min:1|max:5',
            'price' => 'numeric|min:1',
        ]);

        if ($request->file('image')) {
            $file = $request
                ->file('image')
                ->store('products', options: 'public');
            $path = explode('/', $file);
            $validated['image'] = $path[1];
            Product::where('id', $request->id)->update($validated);
        } else {
            Product::where('id', $request->id)->update([
                'title' => $request->title,
                'description' => $request->description,
                'rating' => $request->rating,
                'price' => $request->price,
            ]);
        }

        return redirect(route('products.viewAll', absolute: false));
    }

    public function destroy(Request $request)
    {
        Product::destroy($request->id);

        return redirect(route('products.viewAll', absolute: false));
    }
}
