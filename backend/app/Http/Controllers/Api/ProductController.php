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
    $category = $request->input('category');

    $products = Product::query()
        ->when($search, fn($q) => $q->where('name', 'like', "%{$search}%"))
        ->when($category, fn($q)=> $q->where('category', 'like', "%{$category}%"))
        ->paginate(10);

    return ProductResource::collection($products);
}
    public function show(Product $product) {
        return new ProductResource($product);
    }

  


}
