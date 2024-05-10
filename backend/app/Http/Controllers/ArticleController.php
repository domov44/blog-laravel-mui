<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\Category;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::with('user', 'category')->get();
        return response()->json($articles);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'category_id' => 'required',
        ]);

        $userId = 3;

        $slug = Str::slug($request->input('title'));
        $originalSlug = $slug;
        $suffix = 2;

        while (Article::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $suffix;
            $suffix++;
        }

        Article::create([
            'title' => $request->input('title'),
            'slug' => $slug,
            'content' => $request->input('content'),
            'user_id' => $userId,
            'category_id' => $request->input('category_id'),
        ]);

        return response()->json(['message' => 'Article créé avec succès.']);
    }

    public function update(Request $request, $slug)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $article = Article::where('slug', $slug)->first();
        if (!$article) {
            return response()->json(['error' => 'Article not found.'], 404);
        }

        $article->update([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'category_id' => $request->input('category_id'),
        ]);

        return response()->json(['message' => 'Article updated successfully.']);
    }

    public function destroy($id)
    {
        $article = Article::find($id);
        if (!$article) {
            return response()->json(['error' => 'Article non trouvé.'], 404);
        }

        // if ($article->user_id !== Auth::id()) {
        //     return response()->json(['error' => 'Vous n\'êtes pas autorisé à supprimer cet article.'], 403);
        // }

        $article->delete();
        return response()->json(['success' => 'Article supprimé avec succès.'], 200);
    }

    public function show($slug)
    {
        $article = Article::where('slug', $slug)->with('user', 'category')->first();
        if (!$article) {
            return response()->json(['message' => 'Article non trouvé.'], 404);
        }
        return response()->json($article);
    }
}
