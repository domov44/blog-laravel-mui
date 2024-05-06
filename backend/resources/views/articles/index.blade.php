@php
$layout = Auth::check() ? 'app-layout' : 'logout-layout';
@endphp

<x-dynamic-component :component="$layout">
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Le blog
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            @if (session('success'))
            <div class="bg-green-200 text-green-800 px-4 py-2 rounded mb-4">
                {{ session('success') }}
            </div>
            @endif
            @if (session('error'))
            <div class="bg-red-200 text-red-800 px-4 py-2 rounded mb-4">
                {{ session('error') }}
            </div>
            @endif

            <div class="flex flex-col gap-6">
                @foreach($articles as $article)
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <img src="{{ $article->image_url }}" alt="{{ $article->title }}" class="w-full h-48 object-cover object-center">
                    <div class="p-6">
                        <div class="mb-4">
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{{ $article->user->name }}</span>
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{{ $article->category->label }}</span>
                        </div>
                        <h2 class="text-xl font-semibold mb-2">{{ $article->title }}</h2>
                        <p class="text-gray-600 mb-4">{{ $article->excerpt }}</p>
                        <a href="{{ route('articles.show', $article->id) }}" class="text-blue-500 hover:text-blue-600 font-semibold">Lire l'article</a>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>
</x-dynamic-component>