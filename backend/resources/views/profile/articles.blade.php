<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Mes articles
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
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

            <div class="overflow-x-auto mb-8">
                <table class="table-auto w-full border-collapse">
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="px-4 py-2">Titre</th>
                            <th class="px-4 py-2">Auteur</th>
                            <th class="px-4 py-2">Catégorie</th>
                            <th class="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($articles as $article)
                        <tr>
                            <td class="border px-4 py-2"><a href="{{ route('articles.show', $article->id) }}" class="text-blue-500 hover:text-blue-600 font-semibold ml-4">{{ $article->title }}</a></td>
                            <td class="border px-4 py-2"><span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{{ $article->user->name }}</span></td>
                            <td class="border px-4 py-2"><span class="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2">{{ $article->category->label }}</span></td>
                            <td class="border px-4 py-2">
                                <a href="{{ route('articles.edit', $article->id) }}" class="ml-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded inline-block">Modifier</a>
                                <form action="{{ route('articles.destroy', $article->id) }}" method="POST" class="inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded inline-block">Supprimer</button>
                                </form>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            <div class="fixed bottom-4 right-4">
                <a href="{{ route('articles.create') }}" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded inline-block">Ajouter un article</a>
            </div>
        </div>
    </div>
</x-app-layout>