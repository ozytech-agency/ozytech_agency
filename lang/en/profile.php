<?php

return [
    'title' => 'Profile',
    'header' => 'Profile',

    'avatar' => [
        'change' => 'Change photo',
        'remove' => 'Remove photo',
    ],

    'sections' => [
        'info' => [
            'heading' => 'Profile information',
            'desc' => "Update your account's profile information, email address, and phone number.",
        ],
        'password' => [
            'heading' => 'Update password',
            'desc' => 'Ensure your account is using a long, random password to stay secure.',
        ],
        'delete' => [
            'heading' => 'Delete account',
            'desc' => 'Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.',
            'trigger' => 'Delete account',
            'modal_heading' => 'Are you sure you want to delete your account?',
            'modal_desc' => 'Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.',
            'password_label' => 'Password',
            'cancel' => 'Cancel',
            'confirm' => 'Delete account',
        ],
    ],

    'fields' => [
        'name_label' => 'Name',
        'email_label' => 'Email',
        'phone_label' => 'Phone number',
        'current_password_label' => 'Current password',
        'new_password_label' => 'New password',
        'confirm_password_label' => 'Confirm password',
    ],

    'phone_placeholder' => '6 12 34 56 78',
    'email_unverified_notice' => 'Your email address is unverified.',
    'resend_email_verification' => 'Click here to re-send the verification email.',
    'email_verification_sent' => 'A new verification link has been sent to your email address.',

    'save' => 'Save',
    'saved' => 'Saved.',
];
