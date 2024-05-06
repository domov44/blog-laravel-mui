@extends('layouts.layout')

@section('title', 'Détails de la catégorie')

@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-semibold mb-4">{{ $category->label }}</h1>
    <div class="mt-4">
        <a href="{{ route('categories.index') }}" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded inline-block">Retour</a>
    </div>
</div>
@endsection
