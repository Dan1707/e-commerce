<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
   public function index(Request $request)
{
    $search = $request->input('search');

    $products = Product::query()
        ->when($search, fn($q) => $q->where('name', 'like', "%{$search}%"))
        ->paginate(10);

    return ProductResource::collection($products);
}
    public function show(Product $product) {
        return new ProductResource($product);
    }


}
