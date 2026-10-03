<?php

return [
    'title' => 'Packages | Ozytech Agency',
    'meta_description' => 'Compare fixed-scope engineering packages — Explore, Build, and Scale — and find the right starting point for your next software project.',

    'hero' => [
        'kicker' => 'Ozytech Agency Packages',
        'title' => 'Choose the right starting point.',
        'lead' => 'Focused engagements for teams that want clear momentum without unnecessary ceremony.',
    ],

    'cards' => [
        [
            'label' => '01 / Explore',
            'title' => 'Growth Pack',
            'best_for' => 'Best for early-stage clarity',
            'description' => 'Turn a complex idea into a practical technical direction, delivery plan, and next decision.',
            'features' => [
                'LLC & business incorporation',
                [
                    'text' => 'Website: Shopify, WooCommerce, or WordPress',
                    'note' => "Pick whichever fits your business — a Shopify or WooCommerce store if you sell online, or a standard WordPress website if you don't.",
                ],
                [
                    'text' => 'Free domain name',
                    'note' => "Included free for the first year — choose any available domain name you'd like.",
                ],
                'Website maintenance for 1 year',
                [
                    'text' => 'Payment gateways',
                    'note' => 'Stripe, PayPal, or a local provider — we set up whichever fits your market and how you plan to get paid.',
                ],
            ],
            'cta' => 'Choose this pack',
            'price' => ['amount' => '$4,900', 'period' => 'one-time'],
        ],
        [
            'label' => '02 / Build',
            'title' => 'Pro Pack',
            'best_for' => 'Best for a first product launch',
            'description' => 'Design and ship a strong first version with the engineering foundation to grow beyond launch.',
            'features' => [
                [
                    'text' => 'SaaS development',
                    'note' => 'A multi-tenant web application with secure sign-up, subscription billing, and an admin dashboard tailored to your product.',
                ],
                [
                    'text' => 'Mobile application',
                    'note' => 'A native or cross-platform iOS and Android app, built and published to both app stores.',
                ],
                'Software maintenance for 1 year',
                [
                    'text' => 'Free domain name',
                    'note' => "Included free for the first year — choose any available domain name you'd like.",
                ],
            ],
            'cta' => 'Plan your launch',
            'badge' => 'Most popular',
            'price' => ['amount' => '$24,000', 'period' => 'starting at'],
        ],
        [
            'label' => '03 / Scale',
            'title' => 'Ultimate Pack',
            'best_for' => 'Best for scaling teams',
            'description' => 'Strengthen an existing product, cloud environment, or team for the next stage of demand.',
            'features' => [
                'Platform modernization',
                'Cloud and reliability engineering',
                'Embedded senior engineering team',
                [
                    'text' => 'Dedicated infrastructure & security',
                    'note' => 'A SOC2-ready cloud environment with continuous monitoring, automated backups, and security hardening tailored to your compliance needs.',
                ],
                [
                    'text' => '24/7 priority support',
                    'note' => 'Direct access to your engineering pod with a guaranteed incident response time, any day of the week.',
                ],
                'Quarterly strategy & roadmap reviews',
            ],
            'cta' => 'Talk about scale',
            'price' => ['amount' => '$12,000', 'period' => 'per month'],
        ],
    ],

    'assurances' => [
        'Clear scope agreed before work starts',
        'Direct access to senior engineers',
        'Move to the next package as you grow',
    ],

    'comparison' => [
        'label' => 'Compare packages',
        'title' => 'See exactly what is included at each stage.',
        'subtitle' => 'A side-by-side view of scope, so you can see where one package ends and the next begins.',
        'rows' => [
            ['label' => 'Typical duration', 'type' => 'text', 'values' => ['2–4 weeks', '8–12 weeks', 'Ongoing, quarterly']],
            ['label' => 'Architecture & discovery', 'type' => 'bool', 'values' => [true, true, true]],
            ['label' => 'UX & interface design', 'type' => 'bool', 'values' => [false, true, true]],
            ['label' => 'Production-ready build', 'type' => 'bool', 'values' => [false, true, true]],
            ['label' => 'Cloud & reliability engineering', 'type' => 'bool', 'values' => [false, false, true]],
            ['label' => 'Embedded senior team', 'type' => 'bool', 'values' => [false, false, true]],
            ['label' => 'Direct access to senior engineers', 'type' => 'bool', 'values' => [true, true, true]],
        ],
    ],

    'process' => [
        'label' => 'What happens next',
        'title' => 'From package to production, without the guesswork.',
        'subtitle' => 'Every engagement follows the same clear path, whichever package you start with.',
        'steps' => [
            ['label' => 'STEP 01', 'title' => 'Pick your package', 'desc' => 'Choose the engagement that matches where you are today.'],
            ['label' => 'STEP 02', 'title' => 'Scoping call', 'desc' => 'A principal engineer confirms scope, timeline and team fit within 2 business days.'],
            ['label' => 'STEP 03', 'title' => 'Kickoff & delivery plan', 'desc' => 'You get a written plan with milestones before any work starts.'],
            ['label' => 'STEP 04', 'title' => 'Ship & iterate', 'desc' => 'Regular releases, transparent progress, and a clear path to the next stage.'],
        ],
    ],

    'cta' => [
        'title' => 'Not sure which package fits?',
        'subtitle' => 'Tell us what you are building and we will recommend the right starting point in one working session.',
        'button' => 'Talk to our team',
    ],
];
