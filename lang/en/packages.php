<?php

return [
    'title' => 'Packages',
    'meta_description' => 'Explore Ozytech Agency\'s flexible packages for web development, e-commerce, SaaS, IT solutions, business formation, and payment integration.',

    'hero' => [
        'kicker' => 'Ozytech Agency Packages',
        'title' => 'Choose the right starting point.',
        'lead' => 'we offer flexible packages designed around your goals. Choose the right starting point and let us help you bring your vision to life.',
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
                    'note' => "Pick whichever fits your business - a Shopify or WooCommerce store if you sell online, or a standard WordPress website if you don't.",
                ],
                [
                    'text' => 'Free domain name',
                    'note' => "Included free for the first year - choose any available domain name you'd like.",
                ],
                'Website maintenance for 1 year',
                [
                    'text' => 'Payment gateways',
                    'note' => 'Stripe, PayPal, or a local provider - we set up whichever fits your market and how you plan to get paid.',
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
                    'note' => "Included free for the first year - choose any available domain name you'd like.",
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

    'most_popular' => 'Most popular',

    'state_switcher' => [
        'label' => 'Choose your LLC formation state',
        'new_mexico' => 'New Mexico',
        'wyoming' => 'Wyoming',
        'empty' => 'No packages are available for this state yet.',
        'website' => 'Website Creation Packages',
        'website_empty' => 'No website packages are available yet.',
    ],

    'comparison' => [
        'label' => 'Compare packages',
        'title' => 'See exactly what is included at each stage.',
        'subtitle' => 'Not sure which package is right for your business? Compare our offerings side by side to explore features, services, and benefits. Find the right solution that matches your goals, budget, and project requirements.',
        'rows' => [
            ['label' => 'Typical duration', 'type' => 'text', 'values' => ['2-4 weeks', '8-12 weeks', 'Ongoing, quarterly']],
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
        'subtitle' => 'From Your First Idea to Final Delivery, Made Simple.',
        'steps' => [
            ['label' => 'STEP 01', 'title' => 'Pick your package', 'desc' => 'Explore our packages and select the solution that best matches your business needs, goals, and budget.'],
            ['label' => 'STEP 02', 'title' => 'Discovery & Consultation', 'desc' => 'We discuss your vision, understand your requirements, and identify the right approach for your project.'],
            ['label' => 'STEP 03', 'title' => 'Planning & Development', 'desc' => 'Our team defines the project roadmap, establishes milestones, and starts building your solution with a clear direction.'],
            ['label' => 'STEP 04', 'title' => 'Launch & Ongoing Support', 'desc' => 'We deliver your solution, ensure everything works as expected, and provide continued support as your business grows.'],
        ],
    ],

    'cta' => [
        'title' => 'Not sure which package fits?',
        'subtitle' => 'Tell us what you are building and we will recommend the right starting point in one working session.',
        'button' => 'Talk to our team',
    ],
];
