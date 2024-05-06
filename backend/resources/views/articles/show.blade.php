@extends('layouts.layout')

@section('title', 'Détails de l\'article')

@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-semibold mb-4">{{ $article->title }}</h1>
    <p class="text-gray-800">Par {{ $article->user->name }}</p>
    <p class="text-gray-800">{{ $article->category->label }}</p>
    <p class="text-gray-800">{{ $article->content }}</p>
    <div class="mt-4">
        <a href="{{ route('articles.index') }}" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded inline-block">Retour</a>
    </div>
</div>
@endsection