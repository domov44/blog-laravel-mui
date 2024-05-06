@extends('layouts.layout')

@section('title', 'Ajouter une catégorie')

@section('content')
<div class="flex justify-center items-center h-screen">
    <div class="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 class="text-3xl font-semibold mb-4 text-center">Ajouter un categorie</h1>
        <form method="POST" action="{{ route('categories.store') }}" class="space-y-4">
            @csrf

            <div>
                <label for="label" class="block font-semibold">Label</label>
                <input type="text" id="label" name="label" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
            </div>

            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded inline-block w-full">Créer l'category</button>
        </form>
    </div>
</div>
@endsection