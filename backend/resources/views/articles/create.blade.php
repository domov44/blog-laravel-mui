@extends('layouts.layout')

@section('title', 'Ajouter un article')

@section('content')
<div class="flex justify-center items-center h-screen">
    <div class="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 class="text-3xl font-semibold mb-4 text-center">Ajouter un article</h1>
        <form method="POST" action="{{ route('articles.store') }}" class="space-y-4">
            @csrf
            <div>
                <label for="category" class="block font-semibold">Catégorie</label>
                <select id="category" name="category_id" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
                    @foreach($categories as $category)
                    <option value="{{ $category->id }}">{{ $category->label }}</option>
                    @endforeach
                </select>
            </div>
            <div>
                <label for="title" class="block font-semibold">Titre :</label>
                <input type="text" id="title" name="title" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
            </div>
            <div>
                <label for="content" class="block font-semibold">Contenu :</label>
                <textarea id="content" name="content" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"></textarea>
            </div>
            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded inline-block w-full">Créer l'article</button>
        </form>
    </div>
</div>
@endsection
