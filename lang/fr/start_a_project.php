<?php

return [
    'title' => 'Contacter Ozytech Agency — Démarrer un projet, un partenariat ou une conversation de support',
    'meta_description' => "Parlez de votre projet à Ozytech Agency et soyez mis en relation avec l'équipe et le forfait adaptés.",

    'hero' => [
        'badge' => 'Nous répondons en heures, pas en semaines',
        'title' => 'Définissons ensemble le système dont vous avez vraiment besoin',
        'subtitle' => 'Dites-nous où vous en êtes et où vous allez. Votre message est directement transmis à un ingénieur principal — pas à une boîte de réception générique — capable de parler architecture, délais et budget dès le premier appel.',
        'cta_primary' => 'Contactez-nous',
    ],


    'form' => [
        'title' => 'Envoyez-nous les détails',
        'required_note' => 'Les champs marqués * sont obligatoires. Plus vous partagez de contexte, plus notre première réponse sera précise.',
        'account_note' => 'Votre nom, e-mail et téléphone proviennent de votre compte.',
        'account_note_link' => 'Modifiez-les dans votre profil.',
        'topics' => ['Nouveau projet', 'Partenariat', 'Support', 'Carrières', 'Presse', 'Général'],
        'first_name' => 'Prénom',
        'first_name_placeholder' => 'Amina',
        'last_name' => 'Nom',
        'last_name_placeholder' => 'Benali',
        'email' => 'E-mail professionnel',
        'phone' => 'Téléphone',
        'phone_optional' => '(facultatif)',
        'optional' => '(facultatif)',
        'company' => 'Entreprise / organisation',
        'domain_name' => 'Votre nom de domaine',
        'role' => 'Votre fonction',
        'role_placeholder' => 'VP Ingénierie',
        'work_area' => "Domaine d'activité",
        'select_placeholder' => 'Sélectionner…',
        'work_area_options' => ['Technologie & SaaS', 'E-commerce & Distribution', 'Finance & Fintech', 'Santé', 'Éducation', 'Médias & Marketing', 'Immobilier', 'Logistique & Voyage', 'Associatif', 'Autre'],
        'package_legend' => 'Quel pack vous intéresse ?',
        'package_features' => 'Afficher les fonctionnalités du pack',
        'message' => 'Détails du projet / message',
        'message_placeholder' => 'Objectifs, stack actuelle, le problème que vous résolvez, contraintes, échéances, liens vers des specs ou Figma…',
        'referral' => 'Comment avez-vous entendu parler de nous ?',
        'referral_options' => ['Recommandation / bouche-à-oreille', 'Moteur de recherche', 'LinkedIn', 'GitHub / open source', 'Conférence ou événement', 'Nos écrits / newsletter', 'Client existant', 'Autre'],
        'nda_consent' => 'Veuillez envoyer un NDA mutuel avant notre premier appel.',
        'consent' => "J'accepte qu'Ozytech Agency traite mes informations pour répondre à cette demande, conformément à la",
        'privacy_policy_link' => 'Politique de confidentialité',
        'submit' => 'Démarrer un projet',
        'privacy_note_prefix' => 'Nous ne partageons jamais vos informations. Réponse habituelle :',
        'privacy_note_suffix' => 'sous 24 heures.',
        'success' => [
            'title' => 'Message reçu — vous êtes entre de bonnes mains',
            'message_prefix' => 'Une confirmation est en route vers',
            'message_suffix' => 'Un ingénieur principal vous répondra sous 24 heures. Pour toute urgence, appelez le',
            'reset_cta' => 'Envoyer un autre message',
        ],
        'validation' => [
            'first_name' => 'Prénom',
            'last_name' => 'Nom',
            'email' => 'E-mail professionnel',
            'message' => 'Message',
            'valid_email' => 'un e-mail valide',
            'consent' => 'le consentement à être contacté',
            'prefix' => 'Veuillez ajouter :',
            'generic' => 'Veuillez vérifier les champs surlignés.',
        ],
    ],

    'sidebar' => [
        'schedule' => [
            'title' => 'Vous préférez en discuter directement ?',
            'desc' => 'Écrivez-nous directement sur WhatsApp. Sans discours commercial — un vrai échange sur votre projet, votre périmètre et vos délais.',
            'cta' => 'Contactez-nous sur WhatsApp',
        ],
        'channels' => [
            'title' => 'Canaux directs',
            'email' => 'Écrivez-nous à tout moment',
            'hours' => 'Lun–Ven, heures ouvrées',
        ],
        'next_steps' => [
            'title' => 'La suite',
            'steps' => [
                ['title' => 'Nous étudions et orientons', 'desc' => 'Sous 24 heures, vers le bon responsable — pas une file d\'attente.'],
                ['title' => 'Appel de découverte & cadrage', 'desc' => '30 à 45 min pour challenger vos objectifs, contraintes, délais et budget.'],
                ['title' => "Proposition & note d'architecture", 'desc' => 'Sous 2 à 4 jours : périmètre fixe, plan d\'équipe et jalons concrets.'],
            ],
        ],
    ],

    'faq' => [
        'kicker' => 'Avant de nous écrire',
        'title' => 'Questions fréquentes',
        'subtitle' => 'Vous ne savez toujours pas quelle équipe vous concerne ? Envoyez un message général, nous le transmettrons en interne.',
        'contact_us' => 'Contactez-nous',
        'browse_all' => 'Voir toutes les FAQ',
        'items' => [
            ['q' => 'À quelle vitesse allez-vous me répondre ?', 'a' => 'Le délai médian de première réponse est inférieur à 24 heures. Pour un nouveau projet, attendez-vous à un appel de cadrage programmé sous 2 jours ouvrés. Les incidents de production des clients existants sont accusés réception sous 15 minutes.'],
            ['q' => 'Signez-vous un NDA avant la découverte ?', 'a' => 'Oui. Cochez la case NDA dans le formulaire et nous envoyons un NDA mutuel avant tout échange technique. Si vous avez votre propre document, envoyez-le-nous — notre équipe juridique traite la plupart des NDA le jour même.'],
            ['q' => 'Quel est votre engagement minimum ?', 'a' => "Les sprints de découverte et d'architecture démarrent à 2 semaines. Les missions de construction commencent généralement par une équipe intégrée de 8 semaines (architecte + ingénieurs + responsable de livraison). Les forfaits de support sont mensuels."],
            ['q' => 'Travaillez-vous avec des startups pré-amorçage et en phase précoce ?', 'a' => "Oui, aux côtés des scale-ups et des entreprises mondiales. Nous adaptons le périmètre à votre stade et à votre trésorerie — souvent une équipe MVP légère avec une trajectoire d'architecture claire pour éviter de tout reconstruire en Series A."],
            ['q' => "Pouvez-vous gérer l'incorporation et les paiements en parallèle du build ?", 'a' => "Oui. La création d'entreprise aux États-Unis (Delaware/Wyoming) ou à l'international, l'EIN, l'agent enregistré, ainsi que l'intégration Stripe / PayPal / passerelles multidevises peuvent tous avancer en parallèle de l'ingénierie, dans un seul plan."],
            ['q' => 'Comment fonctionne la tarification ?', 'a' => "Tarification à périmètre fixe pour la découverte, tarification mensuelle par équipe pour la construction, et forfaits pour le support continu. Vous recevez une estimation écrite avec des jalons après l'appel de cadrage — sans engagement."],
            ['q' => 'Quels fuseaux horaires couvrez-vous ?', 'a' => "Notre guilde s'étend sur les Amériques, l'EMEA et l'APAC, nous maintenons donc de vraies heures de chevauchement avec n'importe quel fuseau horaire. Une couverture de fiabilité de site 24/7 est disponible en option."],
            ['q' => 'Je suis déjà client — où puis-je obtenir du support ?', 'a' => "Utilisez support@ozytech.agency ou votre canal Slack dédié. Choisissez « Support client » dans le formulaire pour tout ce qui nécessite une trace écrite ; les incidents de production bénéficient d'un SLA d'accusé de réception de 15 minutes."],
        ],
    ],

    'cta' => [
        'badge' => 'Capacité trimestrielle limitée',
        'title' => 'Votre feuille de route attend un premier message',
        'subtitle' => 'Remplissez le formulaire, réservez un appel ou envoyez-nous simplement un e-mail. Quel que soit votre choix, un ingénieur principal le lira sous quelques heures.',
        'primary' => 'Démarrez votre projet',
        'secondary' => 'Voir nos offres',
    ],
];
