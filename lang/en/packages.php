<?php

return [
    'title' => 'Packages | OzyTech',

    'hero' => [
        'kicker' => 'OzyTech Packages',
        'title' => 'Choose the right starting point.',
        'lead' => 'Focused engagements for teams that want clear momentum without unnecessary ceremony.',
    ],

    'cards' => [
        [
            'label' => '01 / Explore',
            'title' => 'Strategy Sprint',
            'best_for' => 'Best for early-stage clarity',
            'description' => 'Turn a complex idea into a practical technical direction, delivery plan, and next decision.',
            'features' => ['Architecture review', 'Prioritized roadmap', 'Senior working session'],
            'cta' => 'Start a conversation',
        ],
        [
            'label' => '02 / Build',
            'title' => 'Product Launch',
            'best_for' => 'Best for a first product launch',
            'description' => 'Design and ship a strong first version with the engineering foundation to grow beyond launch.',
            'features' => ['Product discovery', 'UX and interface design', 'Production-ready build'],
            'cta' => 'Plan your launch',
            'badge' => 'Most popular',
        ],
        [
            'label' => '03 / Scale',
            'title' => 'Growth Platform',
            'best_for' => 'Best for scaling teams',
            'description' => 'Strengthen an existing product, cloud environment, or team for the next stage of demand.',
            'features' => ['Platform modernization', 'Cloud and reliability work', 'Embedded senior team'],
            'cta' => 'Talk about scale',
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
