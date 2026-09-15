<?php

return [
    'title' => 'Dashboard',
    'header' => 'Dashboard',

    'hero' => [
        'eyebrow' => 'Client workspace',
        'title' => 'Welcome back, :name.',
        'subtitle' => "Everything for your OzyTech engagement lives here — delivery updates, direct access to your team, and every contract you've signed with us.",
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
