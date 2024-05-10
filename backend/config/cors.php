<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Chemins auxquels CORS s'applique
    |--------------------------------------------------------------------------
    |
    | Spécifiez les chemins (URI) pour lesquels vous souhaitez autoriser les requêtes CORS.
    |
    */

    'paths' => ['*'], // Autoriser CORS pour toutes les routes (ajuster si nécessaire)

    /*
    |--------------------------------------------------------------------------
    | Méthodes autorisées pour les requêtes CORS
    |--------------------------------------------------------------------------
    |
    | Spécifiez les méthodes HTTP que vous souhaitez autoriser pour les requêtes CORS.
    |
    */

    'allowed_methods' => ['*'], // Autoriser toutes les méthodes (GET, POST, PUT, DELETE, OPTIONS)

    /*
    |--------------------------------------------------------------------------
    | Origines autorisées pour les requêtes CORS
    |--------------------------------------------------------------------------
    |
    | Spécifiez quelles origines (domaines ou URL) sont autorisées à effectuer des requêtes CORS.
    |
    */

    'allowed_origins' => [
        'http://localhost:3000', // Remplacer par votre origine frontend
    ],

    /*
    |--------------------------------------------------------------------------
    | En-têtes autorisés pour les requêtes CORS
    |--------------------------------------------------------------------------
    |
    | Spécifiez quels en-têtes HTTP sont autorisés à être envoyés par les requêtes CORS.
    |
    */

    'allowed_headers' => ['*'], // Autoriser tous les en-têtes (ajuster si nécessaire)

    /*
    |--------------------------------------------------------------------------
    | En-têtes exposés pour les requêtes CORS
    |--------------------------------------------------------------------------
    |
    | Spécifiez quels en-têtes sont exposés au frontend via l'en-tête Access-Control-Expose-Headers.
    |
    */

    'exposed_headers' => ['*'], // Exposer tous les en-têtes (ajuster si nécessaire)

    /*
    |--------------------------------------------------------------------------
    | Durée de vie maximale du cache CORS (facultatif)
    |--------------------------------------------------------------------------
    |
    | Spécifiez combien de temps (en secondes) le navigateur doit mettre en cache les requêtes CORS de validation préalable (preflight).
    |
    */

    'max_age' => 0, // Ne pas mettre en cache (ajuster si nécessaire)

    /*
    |--------------------------------------------------------------------------
    | Prise en charge des identifiants (facultatif)
    |--------------------------------------------------------------------------
    |
    | Définissez sur true si votre application envoie des cookies ou d'autres identifiants avec des requêtes CORS.
    |
    */

    'supports_credentials' => false, // Définir sur true si nécessaire pour les identifiants
];
