<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    public function create()
    {
        return view('categories.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'label' => 'required',
        ]);

        Category::create([
            'label' => $request->input('label'),
        ]);

        return redirect()->route('categories.index')->with('success', 'Category créé avec succès.');
    }

    public function edit($id)
    {
        $category = Category::find($id);
        return view('categories.edit', compact('category'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'label' => 'required',
        ]);

        $category = Category::find($id);
        if (!$category) {
            return redirect()->route('categories.index')->with('error', 'Categorie non trouvée.');
        }

        $category->update([
            'label' => $request->input('label'),
        ]);

        return redirect()->route('categories.index')->with('success', 'Categorie mise à jour avec succès.');
    }

    public function destroy($id)
    {
        $Category = Category::find($id);
        if ($Category) {
            $Category->delete();
        }
        return redirect()->route('categories.index')->with('success', 'Category supprimé avec succès.');
    }

    public function show($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return redirect()->route('categories.index')->with('error', 'Categorie non trouvé.');
        }
        return view('categories.show', compact('category'));
    }
}
