<?php

return [
    'title' => 'Profil',
    'header' => 'Profil',

    'avatar' => [
        'change' => 'Changer la photo',
        'remove' => 'Supprimer la photo',
    ],

    'sections' => [
        'info' => [
            'heading' => 'Informations du profil',
            'desc' => 'Mettez à jour les informations de votre profil, votre e-mail et votre numéro de téléphone.',
        ],
        'password' => [
            'heading' => 'Modifier le mot de passe',
            'desc' => 'Assurez-vous que votre compte utilise un mot de passe long et aléatoire pour rester sécurisé.',
        ],
        'delete' => [
            'heading' => 'Supprimer le compte',
            'desc' => 'Une fois votre compte supprimé, toutes ses ressources et données seront définitivement supprimées. Avant de supprimer votre compte, veuillez télécharger toutes les données ou informations que vous souhaitez conserver.',
            'trigger' => 'Supprimer le compte',
            'modal_heading' => 'Êtes-vous sûr de vouloir supprimer votre compte ?',
            'modal_desc' => 'Une fois votre compte supprimé, toutes ses ressources et données seront définitivement supprimées. Veuillez saisir votre mot de passe pour confirmer que vous souhaitez supprimer définitivement votre compte.',
            'password_label' => 'Mot de passe',
            'cancel' => 'Annuler',
            'confirm' => 'Supprimer le compte',
        ],
    ],

    'fields' => [
        'name_label' => 'Nom',
        'email_label' => 'E-mail',
        'phone_label' => 'Numéro de téléphone',
        'current_password_label' => 'Mot de passe actuel',
        'new_password_label' => 'Nouveau mot de passe',
        'confirm_password_label' => 'Confirmer le mot de passe',
    ],

    'phone_placeholder' => '6 12 34 56 78',
    'email_unverified_notice' => "Votre adresse e-mail n'est pas vérifiée.",
    'resend_email_verification' => "Cliquez ici pour renvoyer l'e-mail de vérification.",
    'email_verification_sent' => 'Un nouveau lien de vérification a été envoyé à votre adresse e-mail.',
    'phone_unverified_notice' => "Votre numéro de téléphone n'est pas vérifié.",
    'verify_phone_link' => 'Cliquez ici pour vérifier votre numéro de téléphone.',

    'save' => 'Enregistrer',
    'saved' => 'Enregistré.',
];
