<?php

return [
    'title' => 'Offres | OzyTech',

    'hero' => [
        'kicker' => 'Offres OzyTech',
        'title' => 'Choisissez le bon point de départ.',
        'lead' => 'Des missions ciblées pour les équipes qui veulent avancer clairement, sans cérémonie inutile.',
    ],

    'cards' => [
        [
            'label' => '01 / Explorer',
            'title' => 'Sprint stratégique',
            'best_for' => 'Idéal pour la clarté en phase initiale',
            'description' => 'Transformez une idée complexe en une direction technique concrète, un plan de livraison et une prochaine décision.',
            'features' => ['Revue d\'architecture', 'Feuille de route priorisée', 'Session de travail senior'],
            'cta' => 'Démarrer une conversation',
        ],
        [
            'label' => '02 / Construire',
            'title' => 'Lancement produit',
            'best_for' => 'Idéal pour un premier lancement produit',
            'description' => 'Concevez et livrez une première version solide, avec les fondations techniques pour grandir après le lancement.',
            'features' => ['Découverte produit', 'Design UX et interface', 'Version prête pour la production'],
            'cta' => 'Planifier votre lancement',
            'badge' => 'Le plus populaire',
        ],
        [
            'label' => '03 / Grandir',
            'title' => 'Plateforme de croissance',
            'best_for' => 'Idéal pour les équipes en croissance',
            'description' => 'Renforcez un produit, un environnement cloud ou une équipe existante pour la prochaine étape de la demande.',
            'features' => ['Modernisation de plateforme', 'Travaux de cloud et de fiabilité', 'Équipe senior intégrée'],
            'cta' => 'Parler de votre croissance',
        ],
    ],

    'assurances' => [
        'Un périmètre clair validé avant le démarrage',
        'Un accès direct à des ingénieurs seniors',
        "Passez à l'offre suivante à mesure que vous grandissez",
    ],

    'comparison' => [
        'label' => 'Comparer les offres',
        'title' => 'Voyez précisément ce qui est inclus à chaque étape.',
        'subtitle' => "Une vue comparative du périmètre, pour voir où une offre s'arrête et où la suivante commence.",
        'rows' => [
            ['label' => 'Durée type', 'type' => 'text', 'values' => ['2–4 semaines', '8–12 semaines', 'Continu, trimestriel']],
            ['label' => 'Architecture et découverte', 'type' => 'bool', 'values' => [true, true, true]],
            ['label' => 'Design UX et interface', 'type' => 'bool', 'values' => [false, true, true]],
            ['label' => 'Version prête pour la production', 'type' => 'bool', 'values' => [false, true, true]],
            ['label' => 'Travaux de cloud et de fiabilité', 'type' => 'bool', 'values' => [false, false, true]],
            ['label' => 'Équipe senior intégrée', 'type' => 'bool', 'values' => [false, false, true]],
            ['label' => 'Accès direct à des ingénieurs seniors', 'type' => 'bool', 'values' => [true, true, true]],
        ],
    ],

    'process' => [
        'label' => 'La suite des événements',
        'title' => "De l'offre à la production, sans zone d'ombre.",
        'subtitle' => "Chaque mission suit le même parcours clair, quelle que soit l'offre de départ.",
        'steps' => [
            ['label' => 'ÉTAPE 01', 'title' => 'Choisissez votre offre', 'desc' => 'Choisissez la mission qui correspond à votre situation actuelle.'],
            ['label' => 'ÉTAPE 02', 'title' => 'Appel de cadrage', 'desc' => "Un ingénieur principal confirme le périmètre, le calendrier et l'adéquation de l'équipe sous 2 jours ouvrés."],
            ['label' => 'ÉTAPE 03', 'title' => 'Lancement et plan de livraison', 'desc' => 'Vous recevez un plan écrit avec des jalons avant le démarrage des travaux.'],
            ['label' => 'ÉTAPE 04', 'title' => 'Livrer et itérer', 'desc' => 'Des livraisons régulières, une progression transparente et une trajectoire claire vers l\'étape suivante.'],
        ],
    ],

    'cta' => [
        'title' => 'Vous ne savez pas quelle offre choisir ?',
        'subtitle' => 'Dites-nous ce que vous construisez et nous vous recommanderons le bon point de départ en une session de travail.',
        'button' => 'Parler à notre équipe',
    ],
];
