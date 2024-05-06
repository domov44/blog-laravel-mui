@extends('layouts.layout')

@section('title', 'Modifier')

@section('content')
<div class="flex justify-center items-center h-screen">
    <div class="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 class="text-3xl font-semibold mb-4 text-center">Modifier l'article {{ $article->title }}</h1>
        <form action="{{ route('articles.update', ['article' => $article->id]) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="mb-4">
                <label for="title" class="block text-gray-700 font-semibold">Titre</label>
                <input type="text" id="title" name="title" value="{{ $article->title }}" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
            </div>
            <div class="mb-4">
                <label for="content" class="block text-gray-700 font-semibold">Contenu</label>
                <textarea id="content" name="content" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">{{ $article->content }}</textarea>
            </div>
            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded inline-block w-full">Enregistrer</button>
        </form>
    </div>
</div>
@endsection