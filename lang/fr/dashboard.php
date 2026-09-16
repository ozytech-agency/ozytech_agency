<?php

return [
    'title' => 'Tableau de bord',
    'header' => 'Tableau de bord',

    'hero' => [
        'eyebrow' => 'Espace client',
        'title' => 'Bon retour, :name.',
        'subtitle' => 'Tout ce qui concerne votre projet OzyTech se trouve ici — mises à jour de livraison, accès direct à votre équipe, et tous les contrats que vous avez signés avec nous.',
    ],

    'workspace' => [
        'heading' => 'Votre espace de travail',
        'features' => [
            ['title' => 'Visibilité de livraison en temps réel', 'desc' => "Dès qu'un projet démarre, les mises à jour de sprints et de mises en production apparaîtront ici."],
            ['title' => 'Ligne directe avec vos ingénieurs', 'desc' => 'Échangez directement avec votre équipe senior sans attendre une file de tickets.'],
            ['title' => 'Contrats & factures', 'desc' => 'Chaque accord et chaque paiement seront accessibles en un clic, au même endroit.'],
        ],
        'empty' => [
            'title' => 'Aucun projet en cours pour le moment',
            'desc' => 'Quand vous démarrerez un projet avec nous, ses sprints, mises en production et jalons apparaîtront ici.',
            'cta' => 'Démarrer un projet',
        ],
    ],

    'checklist' => [
        'heading' => 'Finalisez votre configuration',
        'items' => [
            'verify_email' => [
                'title' => 'Vérifiez votre e-mail',
                'desc' => 'Confirmez votre adresse e-mail pour sécuriser votre compte.',
                'cta' => 'Vérifier l\'e-mail',
            ],
            'verify_phone' => [
                'title' => 'Vérifiez votre numéro de téléphone',
                'desc' => 'Confirmez le numéro de téléphone fourni lors de votre inscription.',
                'cta' => 'Vérifier le téléphone',
            ],
            'first_inquiry' => [
                'title' => 'Envoyez votre première demande',
                'desc' => 'Dites-nous ce dont vous avez besoin et obtenez un appel de cadrage sous 2 jours ouvrés.',
                'cta' => 'Démarrer un projet',
            ],
        ],
    ],

    'requests' => [
        'heading' => 'Mes demandes',
        'empty' => [
            'title' => 'Aucune demande pour le moment',
            'desc' => 'Envoyez une demande et elle apparaîtra ici.',
            'cta' => 'Démarrer un projet',
        ],
        'status' => [
            'new' => 'Nouvelle',
            'in_progress' => 'En cours',
            'responded' => 'Répondue',
            'closed' => 'Clôturée',
        ],
    ],

    'quick_links' => [
        'heading' => 'Liens rapides',
        'items' => [
            ['title' => 'Démarrer un projet', 'desc' => 'Dites-nous ce dont vous avez besoin et obtenez un appel de cadrage sous 2 jours ouvrés.'],
            ['title' => 'Parcourir les offres', 'desc' => 'Comparez les missions à périmètre fixe et choisissez un point de départ.'],
            ['title' => 'Contacter le support', 'desc' => "Contactez l'équipe directement pour toute question de compte ou de livraison."],
            ['title' => 'Consulter la FAQ', 'desc' => 'Réponses sur les tarifs, les délais, la sécurité, et le démarrage des projets.'],
        ],
    ],

    'account' => [
        'heading' => 'Votre compte',
        'email_status' => "Statut de l'e-mail",
        'verified' => 'Vérifié',
        'not_verified' => 'Non vérifié',
        'member_since' => 'Membre depuis',
        'edit_profile' => 'Modifier le profil',
        'logout' => 'Se déconnecter',
    ],
];
