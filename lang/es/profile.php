<?php

return [
    'title' => 'Perfil',
    'header' => 'Perfil',

    'avatar' => [
        'change' => 'Cambiar foto',
        'remove' => 'Eliminar foto',
    ],

    'sections' => [
        'info' => [
            'heading' => 'Información del perfil',
            'desc' => 'Actualiza la información de tu perfil, tu correo electrónico y tu número de teléfono.',
        ],
        'password' => [
            'heading' => 'Actualizar contraseña',
            'desc' => 'Asegúrate de que tu cuenta utiliza una contraseña larga y aleatoria para mantenerse segura.',
        ],
        'delete' => [
            'heading' => 'Eliminar cuenta',
            'desc' => 'Una vez que tu cuenta sea eliminada, todos sus recursos y datos se eliminarán permanentemente. Antes de eliminar tu cuenta, descarga cualquier dato o información que desees conservar.',
            'trigger' => 'Eliminar cuenta',
            'modal_heading' => '¿Seguro que quieres eliminar tu cuenta?',
            'modal_desc' => 'Una vez que tu cuenta sea eliminada, todos sus recursos y datos se eliminarán permanentemente. Introduce tu contraseña para confirmar que deseas eliminar tu cuenta de forma permanente.',
            'password_label' => 'Contraseña',
            'cancel' => 'Cancelar',
            'confirm' => 'Eliminar cuenta',
        ],
    ],

    'fields' => [
        'name_label' => 'Nombre',
        'email_label' => 'Correo electrónico',
        'phone_label' => 'Número de teléfono',
        'current_password_label' => 'Contraseña actual',
        'new_password_label' => 'Nueva contraseña',
        'confirm_password_label' => 'Confirmar contraseña',
    ],

    'phone_placeholder' => '6 12 34 56 78',
    'email_unverified_notice' => 'Tu dirección de correo no está verificada.',
    'resend_email_verification' => 'Haz clic aquí para reenviar el correo de verificación.',
    'email_verification_sent' => 'Se ha enviado un nuevo enlace de verificación a tu correo electrónico.',
    'phone_unverified_notice' => 'Tu número de teléfono no está verificado.',
    'verify_phone_link' => 'Haz clic aquí para verificar tu número de teléfono.',

    'save' => 'Guardar',
    'saved' => 'Guardado.',
];
