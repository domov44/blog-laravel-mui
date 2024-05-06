<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;

// Importez le middleware CORS
use App\Http\Middleware\CorsMiddleware;

// Appliquez le middleware CORS à toutes les routes
Route::middleware([CorsMiddleware::class])->group(function () {

    // Définissez vos routes normalement
    Route::get('/mes-articles', [ProfileController::class, 'articles'])
        ->middleware(['auth', 'verified'])
        ->name('profile.articles');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::resource('articles', ArticleController::class)->except(['index', 'show']);
        Route::resource('categories', CategoryController::class)->except(['index']);
    });

    Route::get('/', [ArticleController::class, 'index'])->name('articles.index');
    Route::get('/articles/{id}', [ArticleController::class, 'show'])->name('articles.show');
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');

    require __DIR__ . '/auth.php';
});
