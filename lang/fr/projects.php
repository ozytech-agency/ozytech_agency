<?php

return [
    'software-development' => [
        'title' => 'Streamline : plateforme de facturation multi-tenant',
        'type' => 'Plateforme SaaS',
        'summary' => "Une plateforme de facturation SaaS construite de zéro, au service de plus de 40 000 abonnés répartis sur trois formules, reconstruite pour la fiabilité et l'échelle.",
        'client' => ['name' => 'Elena Vasquez', 'role' => 'Directrice technique', 'company' => 'Ledgerly', 'subtitle' => 'Client Ozytech · Facturation SaaS'],
        'testimonial' => "OzyTech a entièrement reconstruit notre moteur d'abonnement. Nous sommes passés d'incidents de facturation hebdomadaires à zéro interruption en production.",
        'problems' => [
            ['problem' => 'Le système de facturation historique de Ledgerly provoquait des pannes hebdomadaires et ne pouvait pas dépasser sa conception initiale limitée à 5 000 abonnés.', 'solution' => "OzyTech a reconstruit le moteur de facturation sur une architecture multi-tenant avec basculement automatisé, éliminant les interruptions à mesure que la base d'abonnés dépassait 40 000."],
            ['problem' => "Le rapprochement manuel entre le système de facturation et les comptes de l'équipe comptable consommait des heures chaque semaine et générait des écarts fréquents.", 'solution' => "OzyTech a construit un pipeline de rapprochement automatisé qui synchronise les événements d'abonnement avec le grand livre en temps réel, supprimant totalement la saisie manuelle."],
        ],
    ],
    'mobile-apps' => [
        'title' => 'Transit Now : application de transport en temps réel',
        'type' => 'Application mobile',
        'summary' => 'Une application mobile multiplateforme aidant plus de 200 000 usagers à suivre bus et trains en temps réel sur quatre réseaux de métro.',
        'client' => ['name' => 'Marcus Bellweather', 'role' => 'Responsable produit', 'company' => 'Transit Now', 'subtitle' => 'Client Ozytech · Technologie du transport'],
        'testimonial' => 'Notre note sur les stores est passée de 2,8 à 4,7 étoiles en deux mois après la refonte OzyTech.',
        'problems' => [
            ['problem' => "Les usagers n'avaient aucun moyen fiable de suivre la position des bus et des trains en temps réel, entraînant des correspondances manquées et une note de 2,8 étoiles.", 'solution' => 'OzyTech a développé une application multiplateforme avec suivi GPS en direct et estimations d\'arrivée prédictives sur quatre réseaux de métro.'],
            ['problem' => "L'application existante plantait fréquemment aux heures de pointe lorsque la charge serveur augmentait.", 'solution' => 'OzyTech a repensé le backend pour une mise à l\'échelle horizontale et ajouté une mise en cache hors ligne, stabilisant l\'application sous forte charge.'],
        ],
    ],
    'mvp-development' => [
        'title' => 'Fundrise : MVP de liste d\'attente investisseurs',
        'type' => 'Produit MVP',
        'summary' => "Un MVP réalisé en six semaines qui a permis à une fondatrice fintech de valider la demande et de boucler une levée de fonds d'amorçage avant même d'écrire une ligne de code de production.",
        'client' => ['name' => 'Priya Anand', 'role' => 'Fondatrice', 'company' => 'Fundrise Labs', 'subtitle' => 'Client Ozytech · Start-up fintech'],
        'testimonial' => "Nous avons utilisé le prototype OzyTech pour boucler notre levée d'amorçage deux semaines après le lancement. Il a fait exactement ce qu'il fallait.",
        'problems' => [
            ['problem' => "La fondatrice devait prouver la demande des investisseurs avant d'engager un budget d'ingénierie pour un produit complet.", 'solution' => "OzyTech a livré un MVP ciblé en six semaines avec liste d'attente et tableau de bord investisseurs, générant les données de traction nécessaires au pitch."],
            ['problem' => "Sans équipe d'ingénierie interne pour l'instant, la fondatrice avait besoin d'une base transmissible proprement à de futures recrues.", 'solution' => "OzyTech a documenté l'architecture et livré une base de code structurée pour qu'une nouvelle équipe puisse l'étendre sans tout réécrire."],
        ],
    ],
    'llc-incorporation' => [
        'title' => 'Northwind Studio : entrée sur le marché américain',
        'type' => 'Constitution de société',
        'summary' => "Constitution au Delaware, obtention de l'EIN et transfert de conformité de bout en bout pour un studio européen qui s'implantait aux États-Unis.",
        'client' => ['name' => 'Lukas Feldmann', 'role' => 'Directeur général', 'company' => 'Northwind Studio', 'subtitle' => 'Client Ozytech · Studio européen'],
        'testimonial' => 'OzyTech a géré toute notre constitution américaine en trois semaines. Nous signions des contrats avec des clients américains avant même de nous attendre à être enregistrés.',
        'problems' => [
            ['problem' => "Northwind Studio devait signer des contrats aux États-Unis mais ne disposait d'aucune entité juridique, d'EIN ni d'agent enregistré dans le pays.", 'solution' => "OzyTech a géré la constitution au Delaware, l'enregistrement de l'EIN et la mise en place de l'agent enregistré de bout en bout en trois semaines."],
            ['problem' => 'Le studio ne connaissait pas les obligations de conformité américaines et risquait de manquer des échéances de dépôt après la constitution.', 'solution' => "OzyTech a mis en place un calendrier de conformité et une documentation de transfert permettant au studio d'opérer ensuite en autonomie."],
        ],
    ],
    'web-development' => [
        'title' => 'Arbor & Co : refonte de la plateforme institutionnelle',
        'type' => 'Site institutionnel',
        'summary' => "Une refonte complète du site institutionnel axée sur la vitesse, l'accessibilité et un modèle de contenu que l'équipe du client pouvait gérer elle-même.",
        'client' => ['name' => 'Rachel Kim', 'role' => 'Directrice marketing', 'company' => 'Arbor & Co', 'subtitle' => 'Client Ozytech · Cabinet de services professionnels'],
        'testimonial' => "Notre nouveau site se charge en moins d'une seconde et notre équipe modifie enfin les pages sans ouvrir de ticket.",
        'problems' => [
            ['problem' => "L'ancien site d'Arbor & Co mettait plus de six secondes à charger et chaque modification de contenu exigeait l'ouverture d'un ticket auprès des développeurs.", 'solution' => "OzyTech a reconstruit le site sur une stack orientée performance avec un modèle de contenu que l'équipe marketing pouvait gérer directement."],
            ['problem' => "Le site échouait aux contrôles d'accessibilité de base, excluant les visiteurs utilisant un lecteur d'écran ou la navigation au clavier.", 'solution' => "OzyTech a reconstruit chaque page pour respecter les normes WCAG, vérifiées par des tests d'accessibilité automatisés et manuels."],
        ],
    ],
    'cms-development' => [
        'title' => 'Bramwell Journal : plateforme éditoriale',
        'type' => 'Plateforme éditoriale',
        'summary' => 'Une refonte WordPress sur mesure pour une publication numérique gérant plus de 40 rédacteurs contributeurs et des délais éditoriaux quotidiens.',
        'client' => ['name' => 'Tobias Reyes', 'role' => 'Rédacteur en chef', 'company' => 'Bramwell Journal', 'subtitle' => 'Client Ozytech · Publication numérique'],
        'testimonial' => "Publier est passé d'une corvée de 20 minutes à une tâche de deux minutes. Nos rédacteurs apprécient désormais utiliser le CMS.",
        'problems' => [
            ['problem' => 'Plus de 40 rédacteurs contributeurs partageaient une installation WordPress peu pratique, transformant la publication en une corvée de 20 minutes sous des délais quotidiens.', 'solution' => 'OzyTech a reconstruit le CMS avec des blocs personnalisés et un flux éditorial simplifié, ramenant le temps de publication à deux minutes.'],
            ['problem' => "Les rédacteurs en chef n'avaient aucun moyen de gérer les permissions des contributeurs, ce qui entraînait des modifications accidentelles sur des articles déjà publiés.", 'solution' => 'OzyTech a introduit des permissions basées sur les rôles et une file de validation afin que les modifications soient approuvées avant publication.'],
        ],
    ],
    'shopify-store-development' => [
        'title' => 'Solstice Goods : lancement en vente directe',
        'type' => 'Site e-commerce',
        'summary' => 'Une boutique Shopify conçue pour lancer une nouvelle marque de biens de consommation, de la personnalisation du checkout à la configuration des intégrations.',
        'client' => ['name' => 'Ines Duarte', 'role' => 'Cofondatrice', 'company' => 'Solstice Goods', 'subtitle' => 'Client Ozytech · Marque de biens de consommation'],
        'testimonial' => 'Nous avons atteint notre objectif de ventes du premier mois en onze jours. Le tunnel de paiement conçu par OzyTech convertit bien mieux que notre ancienne boutique.',
        'problems' => [
            ['problem' => 'Solstice Goods lançait une nouvelle marque sans boutique, sans tunnel de paiement ni intégrations d\'applications en place.', 'solution' => 'OzyTech a construit une boutique Shopify orientée conversion avec un checkout personnalisé et les intégrations nécessaires pour le jour du lancement.'],
            ['problem' => 'Les fondateurs devaient mettre la boutique en ligne avant la fin de leur fenêtre de ventes du premier mois.', 'solution' => 'OzyTech a livré l\'ensemble du projet à temps pour le lancement, aidant la marque à atteindre son objectif de ventes du premier mois en onze jours.'],
        ],
    ],
    'payment-solutions' => [
        'title' => 'Marketplace Pay : paiement multidevise',
        'type' => 'Infrastructure de paiement',
        'summary' => "Une refonte de l'infrastructure de paiement permettant un checkout multidevise et des versements automatisés pour une marketplace à deux faces.",
        'client' => ['name' => 'Daniel Osei', 'role' => 'VP Ingénierie', 'company' => 'Marketplace Pay', 'subtitle' => 'Client Ozytech · Marketplace à deux faces'],
        'testimonial' => "Les paiements échoués ont chuté de 80 % après l'intégration. Notre équipe finance fait enfin confiance aux chiffres.",
        'problems' => [
            ['problem' => "La marketplace ne pouvait accepter qu'une seule devise, ce qui bloquait l'expansion vers de nouvelles régions.", 'solution' => 'OzyTech a mis en place un checkout multidevise sur Stripe Connect, permettant des transactions dans les devises requises par chaque marché.'],
            ['problem' => "Les paiements échoués étaient fréquents et l'équipe finance n'avait aucun moyen fiable de rapprocher les versements.", 'solution' => 'OzyTech a automatisé le rapprochement des versements et amélioré la logique de relance, réduisant les paiements échoués de 80 %.'],
        ],
    ],
    'cloud-management' => [
        'title' => 'Vertex Cloud : refonte de l\'observabilité',
        'type' => "Plateforme d'observabilité cloud",
        'summary' => "Un programme complet d'observabilité et de gouvernance des coûts pour une plateforme exécutant plus de 200 microservices sur plusieurs régions.",
        'client' => ['name' => 'Samuel Okafor', 'role' => 'Directeur infrastructure', 'company' => 'Vertex Systems', 'subtitle' => "Client Ozytech · Plateforme d'infrastructure"],
        'testimonial' => "Nous avons réduit notre facture cloud d'un tiers et nous savons enfin ce qui a déclenché chaque incident avant que les clients ne le remarquent.",
        'problems' => [
            ['problem' => "Avec plus de 200 microservices répartis sur plusieurs régions, l'équipe n'avait aucune vision unifiée de ce qui déclenchait les incidents.", 'solution' => "OzyTech a construit une stack d'observabilité centralisée avec du tracing distribué pour remonter instantanément à la cause racine de chaque incident."],
            ['problem' => "Les dépenses cloud augmentaient plus vite que l'usage, sans visibilité sur les services responsables des coûts.", 'solution' => "OzyTech a introduit des tableaux de bord de gouvernance des coûts et des politiques de rightsizing, réduisant la facture cloud d'un tiers."],
        ],
    ],
    'cloud-migration' => [
        'title' => 'Halcyon Retail : migration cloud-native',
        'type' => 'Migration cloud',
        'summary' => "Une migration sans interruption d'une plateforme retail historique, de serveurs sur site vers une architecture cloud-native moderne.",
        'client' => ['name' => 'Grace Whitfield', 'role' => 'Directrice technique', 'company' => 'Halcyon Retail', 'subtitle' => 'Client Ozytech · Plateforme retail'],
        'testimonial' => "Nous avons migré toute notre plateforme sans une seule minute d'interruption pendant les heures d'ouverture. Une exécution impressionnante.",
        'problems' => [
            ['problem' => "Halcyon Retail devait quitter des serveurs sur site vieillissants sans perturber le trafic pendant les heures d'ouverture.", 'solution' => "OzyTech a planifié une bascule progressive et sans interruption vers une architecture cloud-native, migrant sans aucune coupure pendant les heures d'ouverture."],
            ['problem' => 'La plateforme historique reposait sur des services fortement couplés, rendant un simple lift-and-shift risqué.', 'solution' => 'OzyTech a découplé les services critiques avant la migration, les conteneurisant pour un passage plus propre vers le cloud.'],
        ],
    ],
    'it-infrastructure' => [
        'title' => 'Meridian Labs : fondations informatiques de bureau',
        'type' => 'Infrastructure informatique',
        'summary' => 'Un déploiement de réseau et de serveurs sécurisé pour un laboratoire de R&D en pleine croissance ouvrant un second bureau.',
        'client' => ['name' => 'Owen Whitaker', 'role' => 'Responsable des opérations', 'company' => 'Meridian Labs', 'subtitle' => 'Client Ozytech · Laboratoire de R&D'],
        'testimonial' => 'Notre nouveau bureau était pleinement opérationnel dès le premier jour, réseau, serveurs, tout, grâce à la documentation de transfert.',
        'problems' => [
            ['problem' => 'Meridian Labs ouvrait un second bureau sans aucun réseau, serveur ni infrastructure de sécurité prévus.', 'solution' => "OzyTech a conçu et déployé des fondations réseau et serveurs sécurisées, prêtes avant l'ouverture du bureau."],
            ['problem' => "L'équipe des opérations ne disposait d'aucune documentation pour maintenir les systèmes après le transfert.", 'solution' => 'OzyTech a livré une documentation de transfert complète, permettant au nouveau bureau d\'être pleinement opérationnel dès le premier jour.'],
        ],
    ],
    'cyber-security' => [
        'title' => 'Ferro Bank : programme de renforcement de la sécurité',
        'type' => 'Programme de renforcement de la sécurité',
        'summary' => "Un programme d'évaluation des risques et de renforcement des accès pour une fintech traitant des données financières client sensibles.",
        'client' => ['name' => 'Isabelle Moreau', 'role' => 'Responsable sécurité', 'company' => 'Ferro Bank', 'subtitle' => 'Client Ozytech · Fintech'],
        'testimonial' => "Nous avons réussi notre premier audit SOC2 sans aucune non-conformité majeure, une première dans l'histoire de notre entreprise.",
        'problems' => [
            ['problem' => "Ferro Bank devait réussir un audit SOC2 mais n'avait jamais mené d'évaluation des risques formelle.", 'solution' => "OzyTech a mené une évaluation des risques complète et renforcé les contrôles d'accès dans toute l'organisation avant l'audit."],
            ['problem' => "Les données financières sensibles des clients manquaient de contrôles d'accès cohérents entre les équipes.", 'solution' => "OzyTech a mis en place des politiques d'accès selon le principe du moindre privilège et des playbooks de réponse aux incidents, comblant les lacunes avant l'arrivée des auditeurs."],
        ],
    ],
    'consulting-training' => [
        'title' => "Bright Path Health : manuel d'ingénierie",
        'type' => 'Programme de montée en compétences technique',
        'summary' => "Une revue d'architecture et un programme de formation d'équipe qui ont donné aux ingénieurs d'une healthtech en croissance un cadre de décision commun.",
        'client' => ['name' => 'Nathaniel Cross', 'role' => 'VP Ingénierie', 'company' => 'Bright Path Health', 'subtitle' => 'Client Ozytech · Healthtech'],
        'testimonial' => 'Notre équipe livre avec un tiers des allers-retours que nous avions avant. Les ateliers se sont rentabilisés en un mois.',
        'problems' => [
            ['problem' => "L'équipe d'ingénierie en croissance de Bright Path Health n'avait aucun cadre partagé pour prendre des décisions d'architecture, ce qui provoquait des allers-retours répétés.", 'solution' => "OzyTech a mené une revue d'architecture et construit un cadre de décision commun que l'équipe pouvait appliquer par la suite."],
            ['problem' => "Les ingénieurs juniors manquaient d'accompagnement structuré, ralentissant l'onboarding et les cycles de revue de code.", 'solution' => 'OzyTech a animé des ateliers pratiques donnant aux ingénieurs un vocabulaire commun et un standard de revue partagé.'],
        ],
    ],
    'remote-team' => [
        'title' => "Quantum Freight : équipe d'ingénierie étendue",
        'type' => "Équipe d'ingénierie à distance",
        'summary' => "Une équipe d'ingénierie à distance dédiée, intégrée à l'équipe interne, pour accélérer la feuille de route d'une plateforme logistique.",
        'client' => ['name' => 'Felicity Adeyemi', 'role' => 'Directrice technique', 'company' => 'Quantum Freight', 'subtitle' => 'Client Ozytech · Plateforme logistique'],
        'testimonial' => 'Ça a cessé de ressembler à de la sous-traitance dès la deuxième semaine. Les ingénieurs OzyTech sont simplement devenus membres de notre équipe.',
        'problems' => [
            ['problem' => 'La feuille de route de Quantum Freight avançait plus vite que ce que son équipe interne pouvait livrer.', 'solution' => "OzyTech a intégré une équipe d'ingénierie à distance dédiée, directement intégrée à l'équipe et aux process existants."],
            ['problem' => 'Les précédentes collaborations en sous-traitance semblaient déconnectées du produit et mal communiquées.', 'solution' => "Les ingénieurs OzyTech ont rejoint directement les stand-ups quotidiens et la planification, devenant indiscernables de l'équipe interne en quelques semaines."],
        ],
    ],
    'data-refinement' => [
        'title' => 'Clearline Logistics : refonte du reporting',
        'type' => 'Plateforme de données',
        'summary' => "Un projet de nettoyage de données et d'automatisation de pipelines qui a transformé des années de données logistiques incohérentes en reporting fiable.",
        'client' => ['name' => 'Victor Almeida', 'role' => 'Responsable analytique', 'company' => 'Clearline Logistics', 'subtitle' => 'Client Ozytech · Analytique logistique'],
        'testimonial' => "Pour la première fois, notre direction fait suffisamment confiance aux chiffres du tableau de bord pour prendre des décisions à partir d'eux.",
        'problems' => [
            ['problem' => 'Des années de données logistiques incohérentes avaient miné la confiance de la direction envers les tableaux de bord de reporting.', 'solution' => 'OzyTech a nettoyé et standardisé les données historiques, en reconstruisant les pipelines qui alimentent les tableaux de bord.'],
            ['problem' => 'Les rapports étaient générés manuellement chaque semaine, retardant les décisions de plusieurs jours.', 'solution' => 'OzyTech a automatisé le pipeline de reporting de bout en bout, donnant à la direction des chiffres toujours à jour et fiables.'],
        ],
    ],
    'localization' => [
        'title' => 'Aurelia Beauty : expansion sur cinq marchés',
        'type' => 'Localisation produit',
        'summary' => "Un effort complet de localisation produit et marketing accompagnant l'expansion d'une marque de beauté vers cinq nouveaux marchés internationaux.",
        'client' => ['name' => 'Camille Laurent', 'role' => 'Responsable croissance internationale', 'company' => 'Aurelia Beauty', 'subtitle' => 'Client Ozytech · Marque de beauté'],
        'testimonial' => "Notre taux de conversion sur les nouveaux marchés a rejoint celui de notre marché d'origine dès le premier trimestre, ce qui n'arrive jamais.",
        'problems' => [
            ['problem' => "Aurelia Beauty s'étendait vers cinq nouveaux marchés avec un contenu produit et marketing qui semblait traduit automatiquement.", 'solution' => 'OzyTech a mené un effort de localisation complet, adaptant langue, imagerie et flux de travail pour chaque marché.'],
            ['problem' => "Le produit ne disposait d'aucun support RTL, bloquant un lancement propre sur les marchés utilisant l'écriture de droite à gauche.", 'solution' => "OzyTech a reconstruit l'interface avec un support RTL complet et des tests spécifiques à chaque locale avant le lancement."],
        ],
    ],
    'ecommerce' => [
        'title' => 'Woodland Supply Co : relance de la boutique',
        'type' => 'Site e-commerce',
        'summary' => "Une relance e-commerce complète avec une nouvelle boutique, une configuration de paiement et un système d'inventaire pour un détaillant d'articles de plein air en croissance.",
        'client' => ['name' => 'Henry Caldwell', 'role' => 'Propriétaire', 'company' => 'Woodland Supply Co', 'subtitle' => "Client Ozytech · Détaillant d'articles de plein air"],
        'testimonial' => "L'abandon de panier a chuté de 30 % après la mise en ligne du nouveau checkout. Le meilleur investissement de l'année pour nous.",
        'problems' => [
            ['problem' => "Woodland Supply Co perdait près d'un tiers de ses clients au moment du paiement sur son ancienne boutique.", 'solution' => 'OzyTech a relancé la boutique avec un checkout simplifié et une configuration de paiement moderne.'],
            ['problem' => "Le suivi des stocks était manuel, entraînant la survente d'articles en rupture.", 'solution' => "OzyTech a intégré un système d'inventaire en direct connecté directement à la boutique."],
        ],
    ],
    'ui-ux-design' => [
        'title' => 'Fintra : refonte d\'application bancaire',
        'type' => "Refonte d'application bancaire",
        'summary' => "Une refonte complète, guidée par la recherche, de l'interface d'une application de finances personnelles, réduisant fortement l'abandon à l'onboarding.",
        'client' => ['name' => 'Sophie Tanaka', 'role' => 'Responsable design', 'company' => 'Fintra', 'subtitle' => 'Client Ozytech · Application de finances personnelles'],
        'testimonial' => "Le taux de complétion de l'onboarding est passé de 54 % à 89 %. Les utilisateurs comprennent enfin l'application dès le premier essai.",
        'problems' => [
            ['problem' => "Le parcours d'onboarding de Fintra perdait 46 % des nouveaux utilisateurs avant qu'ils n'atteignent le produit principal.", 'solution' => "OzyTech a mené une refonte guidée par la recherche du parcours d'onboarding, simplifiant chaque étape à l'essentiel."],
            ['problem' => 'Les utilisateurs comprenaient fréquemment mal les fonctionnalités bancaires principales, ce qui augmentait les tickets de support.', 'solution' => "OzyTech a repensé l'interface autour de modèles clairs et testés, correspondant à la façon dont les utilisateurs pensent réellement leur argent."],
        ],
    ],
    'seo-optimization' => [
        'title' => 'Coastal Realty Group : croissance organique',
        'type' => 'Programme de croissance SEO',
        'summary' => "Une refonte SEO technique et éditoriale qui a triplé le trafic de recherche organique d'une agence immobilière régionale en six mois.",
        'client' => ['name' => 'Andre Bellamy', 'role' => 'Directeur marketing', 'company' => 'Coastal Realty Group', 'subtitle' => 'Client Ozytech · Activité immobilière'],
        'testimonial' => "Les leads organiques ont triplé sans augmenter notre budget publicitaire d'un seul euro. L'audit technique valait déjà le coup à lui seul.",
        'problems' => [
            ['problem' => "Les annonces de Coastal Realty Group apparaissaient rarement au-delà de la deuxième page des résultats de recherche, privant l'équipe commerciale de leads organiques.", 'solution' => 'OzyTech a mené un audit SEO technique et reconstruit la stratégie de contenu autour des termes réellement recherchés par les acheteurs.'],
            ['problem' => 'La lenteur des pages nuisait à la fois au classement et à la conversion mobile.', 'solution' => "OzyTech a optimisé les Core Web Vitals sur l'ensemble du site, améliorant à la fois le classement dans les résultats et la conversion mobile."],
        ],
    ],
    'website-maintenance' => [
        'title' => 'Hearth & Home : fiabilité continue du site',
        'type' => 'Programme de fiabilité du site',
        'summary' => 'Un programme de maintenance continue qui a stabilisé un site e-commerce à fort trafic sujet à des pannes récurrentes et des mises en ligne lentes.',
        'client' => ['name' => 'Miriam Solberg', 'role' => 'Responsable e-commerce', 'company' => 'Hearth & Home', 'subtitle' => 'Client Ozytech · E-commerce à fort trafic'],
        'testimonial' => "Nous n'avons connu aucune panne imprévue depuis qu'OzyTech assure la maintenance. Notre cadence de mise en production a aussi doublé.",
        'problems' => [
            ['problem' => 'Hearth & Home subissait des pannes récurrentes et imprévues pendant les événements de vente à fort trafic.', 'solution' => 'OzyTech a diagnostiqué les causes racines et mis en place une surveillance et des alertes continues pour détecter les problèmes avant que les clients ne les remarquent.'],
            ['problem' => "Les mises en production étaient lentes et risquées, limitant la fréquence des améliorations livrées par l'équipe.", 'solution' => "OzyTech a simplifié le processus de mise en production, doublant la cadence de livraison de l'équipe sans ajouter d'incidents."],
        ],
    ],
];
