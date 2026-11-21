<?php

return [
    'title' => 'Submit a Review',
    'meta_description' => 'Worked with Ozytech Agency? Share your experience - your review helps other teams decide.',

    'hero' => [
        'eyebrow' => 'Client reviews',
        'title' => 'How was working with us?',
        'subtitle' => 'Tell us about your project and the team. No account needed - it takes about a minute.',
    ],

    'form' => [
        'heading' => 'Write your review',
        'name_label' => 'Your name',
        'name_placeholder' => 'John Doe',
        'email_label' => 'Email',
        'email_placeholder' => 'you@company.com',
        'email_note' => 'Never shown publicly. We only use it if we need to confirm your review.',
        'role_label' => 'Role and company',
        'role_placeholder' => 'CTO, Acme Inc.',
        'optional' => '(optional)',
        'rating_label' => 'Your rating',
        'rating_star' => ':count out of 5 stars',
        'review_label' => 'Your review',
        'review_placeholder' => 'What did we build together, and how did it go?',
        'account_note' => 'Posting as :name.',
        'submit' => 'Submit review',
        'success' => [
            'title' => 'Thank you for your review!',
            'message' => 'Our team will check it shortly, then it will appear on our website.',
            'again' => 'Write another review',
        ],
    ],

    'aside' => [
        'heading' => 'Before you write',
        'points' => [
            ['icon' => 'verified', 'text' => 'Every review is read by our team before it’s published.'],
            ['icon' => 'visibility_off', 'text' => 'Only your name, role and review are shown. Your email stays private.'],
            ['icon' => 'thumbs_up_down', 'text' => 'Honest feedback, good or bad, helps us improve.'],
        ],
    ],
];
