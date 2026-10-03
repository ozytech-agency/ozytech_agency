<?php

return [
    'title' => 'Offres | OzyTech',
    'meta_description' => "Comparez nos forfaits d'ingénierie à périmètre fixe — Explorer, Construire et Évoluer — et trouvez le bon point de départ pour votre prochain projet logiciel.",

    'hero' => [
        'kicker' => 'Offres OzyTech',
        'title' => 'Choisissez le bon point de départ.',
        'lead' => 'Des missions ciblées pour les équipes qui veulent avancer clairement, sans cérémonie inutile.',
    ],

    'cards' => [
        [
            'label' => '01 / Explorer',
            'title' => 'Pack de croissance',
            'best_for' => 'Idéal pour la clarté en phase initiale',
            'description' => 'Transformez une idée complexe en une direction technique concrète, un plan de livraison et une prochaine décision.',
            'features' => [
                'Création & incorporation de LLC',
                [
                    'text' => 'Site web : Shopify, WooCommerce ou WordPress',
                    'note' => 'Choisissez ce qui convient à votre activité — une boutique Shopify ou WooCommerce si vous vendez en ligne, ou un site WordPress classique sinon.',
                ],
                [
                    'text' => 'Nom de domaine gratuit',
                    'note' => 'Inclus gratuitement la première année — choisissez le nom de domaine disponible de votre choix.',
                ],
                'Maintenance du site pendant 1 an',
                [
                    'text' => 'Passerelles de paiement',
                    'note' => 'Stripe, PayPal ou un prestataire local — nous configurons celui qui convient à votre marché et à votre façon d\'encaisser.',
                ],
            ],
            'cta' => 'Choisir ce pack',
            'price' => ['amount' => '4 900 $', 'period' => 'paiement unique'],
        ],
        [
            'label' => '02 / Construire',
            'title' => 'Pack Pro',
            'best_for' => 'Idéal pour un premier lancement produit',
            'description' => 'Concevez et livrez une première version solide, avec les fondations techniques pour grandir après le lancement.',
            'features' => [
                [
                    'text' => 'Développement SaaS',
                    'note' => 'Une application web multi-tenant avec inscription sécurisée, facturation d\'abonnement et tableau de bord admin adapté à votre produit.',
                ],
                [
                    'text' => 'Application mobile',
                    'note' => 'Une application native ou multiplateforme iOS et Android, développée et publiée sur les deux stores.',
                ],
                'Maintenance logicielle pendant 1 an',
                [
                    'text' => 'Nom de domaine gratuit',
                    'note' => 'Inclus gratuitement la première année — choisissez le nom de domaine disponible de votre choix.',
                ],
            ],
            'cta' => 'Planifier votre lancement',
            'badge' => 'Le plus populaire',
            'price' => ['amount' => '24 000 $', 'period' => 'à partir de'],
        ],
        [
            'label' => '03 / Grandir',
            'title' => 'Pack Ultimate',
            'best_for' => 'Idéal pour les équipes en croissance',
            'description' => 'Renforcez un produit, un environnement cloud ou une équipe existante pour la prochaine étape de la demande.',
            'features' => [
                'Modernisation de plateforme',
                'Ingénierie cloud et fiabilité',
                'Équipe d\'ingénierie senior intégrée',
                [
                    'text' => 'Infrastructure et sécurité dédiées',
                    'note' => 'Un environnement cloud conforme SOC2 avec surveillance continue, sauvegardes automatisées et durcissement de la sécurité adapté à vos besoins de conformité.',
                ],
                [
                    'text' => 'Support prioritaire 24/7',
                    'note' => 'Accès direct à votre équipe d\'ingénierie avec un délai de réponse garanti aux incidents, tous les jours de la semaine.',
                ],
                'Revues stratégiques et feuille de route trimestrielles',
            ],
            'cta' => 'Parler de votre croissance',
            'price' => ['amount' => '12 000 $', 'period' => 'par mois'],
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
