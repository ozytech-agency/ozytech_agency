<?php

return [
    'title' => 'Dashboard',
    'header' => 'Dashboard',

    'hero' => [
        'eyebrow' => 'Client workspace',
        'title' => 'Welcome back, :name.',
        'subtitle' => "Everything for your Ozytech Agency engagement lives here — delivery updates, direct access to your team, and every contract you've signed with us.",
    ],

    'workspace' => [
        'heading' => 'Your workspace',
        'features' => [
            ['title' => 'Real-time delivery visibility', 'desc' => 'Once a project kicks off, sprint and release updates will show up here.'],
            ['title' => 'Direct line to your engineers', 'desc' => 'Message your senior team directly instead of waiting on a ticket queue.'],
            ['title' => 'Contracts & invoices', 'desc' => 'Every agreement and payment record will be a click away in one tab.'],
        ],
        'empty' => [
            'title' => 'No active engagements yet',
            'desc' => 'When you start a project with us, its sprints, releases, and milestones will appear here.',
            'cta' => 'Start a project',
        ],
    ],

    'checklist' => [
        'heading' => 'Get set up',
        'items' => [
            'verify_email' => [
                'title' => 'Verify your email',
                'desc' => 'Confirm your email address to secure your account.',
                'cta' => 'Verify email',
            ],
            'verify_phone' => [
                'title' => 'Verify your phone number',
                'desc' => 'Confirm the phone number you signed up with.',
                'cta' => 'Verify phone',
            ],
            'first_inquiry' => [
                'title' => 'Submit your first request',
                'desc' => 'Tell us what you need and get a scoping call within 2 business days.',
                'cta' => 'Start a project',
            ],
        ],
    ],

    'requests' => [
        'heading' => 'My requests',
        'empty' => [
            'title' => 'No requests yet',
            'desc' => 'Submit a request and it will show up here.',
            'cta' => 'Start a project',
        ],
        'status' => [
            'in_review' => 'In review',
            'in_progress' => 'In progress',
            'completed' => 'Completed',
        ],
        'remove' => [
            'label' => 'Remove request',
            'title' => 'Remove this project request?',
            'desc' => "Are you sure you want to remove this project request? This can't be undone.",
            'confirm' => 'Yes',
            'cancel' => 'No',
        ],
    ],

    'quick_links' => [
        'heading' => 'Quick links',
        'items' => [
            ['title' => 'Start a project', 'desc' => 'Tell us what you need and get a scoping call within 2 business days.'],
            ['title' => 'Browse packages', 'desc' => 'Compare fixed-scope engagements and pick a starting point.'],
            ['title' => 'Contact support', 'desc' => 'Reach the team directly for anything account or delivery related.'],
            ['title' => 'Read FAQs', 'desc' => 'Answers on pricing, timelines, security, and how engagements start.'],
        ],
    ],

    'account' => [
        'heading' => 'Your account',
        'email_status' => 'Email status',
        'verified' => 'Verified',
        'not_verified' => 'Not verified',
        'member_since' => 'Member since',
        'edit_profile' => 'Edit profile',
        'logout' => 'Log out',
    ],
];
