@extends('layouts.layout')

@section('title', 'Modifier')

@section('content')
<div class="flex justify-center items-center h-screen">
    <div class="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 class="text-3xl font-semibold mb-4 text-center">Modifier la categorie {{ $category->label }}</h1>
        <form action="{{ route('categories.update', ['category' => $category->id]) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="mb-4">
                <label for="label" class="block text-gray-700 font-semibold">label</label>
                <input type="text" id="label" name="label" value="{{ $category->label }}" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
            </div>
            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded inline-block w-full">Enregistrer</button>
        </form>
    </div>
</div>
@endsection
