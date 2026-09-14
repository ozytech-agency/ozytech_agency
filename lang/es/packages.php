<?php

return [
    'title' => 'Paquetes | OzyTech',

    'hero' => [
        'kicker' => 'Paquetes OzyTech',
        'title' => 'Elige el punto de partida correcto.',
        'lead' => 'Proyectos enfocados para equipos que quieren avanzar con claridad, sin ceremonias innecesarias.',
    ],

    'cards' => [
        [
            'label' => '01 / Explorar',
            'title' => 'Sprint estratégico',
            'best_for' => 'Ideal para claridad en etapas tempranas',
            'description' => 'Convierte una idea compleja en una dirección técnica práctica, un plan de entrega y la siguiente decisión.',
            'features' => ['Revisión de arquitectura', 'Hoja de ruta priorizada', 'Sesión de trabajo senior'],
            'cta' => 'Iniciar una conversación',
        ],
        [
            'label' => '02 / Construir',
            'title' => 'Lanzamiento de producto',
            'best_for' => 'Ideal para un primer lanzamiento de producto',
            'description' => 'Diseña y lanza una primera versión sólida con las bases de ingeniería para crecer después del lanzamiento.',
            'features' => ['Descubrimiento de producto', 'Diseño UX e interfaz', 'Compilación lista para producción'],
            'cta' => 'Planifica tu lanzamiento',
            'badge' => 'Más popular',
        ],
        [
            'label' => '03 / Escalar',
            'title' => 'Plataforma de crecimiento',
            'best_for' => 'Ideal para equipos en crecimiento',
            'description' => 'Fortalece un producto, entorno cloud o equipo existente para la siguiente etapa de demanda.',
            'features' => ['Modernización de plataforma', 'Trabajo de nube y fiabilidad', 'Equipo senior integrado'],
            'cta' => 'Hablemos de escalar',
        ],
    ],

    'assurances' => [
        'Alcance claro acordado antes de empezar',
        'Acceso directo a ingenieros senior',
        'Avanza al siguiente paquete a medida que creces',
    ],

    'comparison' => [
        'label' => 'Compara los paquetes',
        'title' => 'Descubre exactamente qué incluye cada etapa.',
        'subtitle' => 'Una vista comparativa del alcance, para que veas dónde termina un paquete y empieza el siguiente.',
        'rows' => [
            ['label' => 'Duración típica', 'type' => 'text', 'values' => ['2–4 semanas', '8–12 semanas', 'Continuo, trimestral']],
            ['label' => 'Arquitectura y descubrimiento', 'type' => 'bool', 'values' => [true, true, true]],
            ['label' => 'Diseño UX e interfaz', 'type' => 'bool', 'values' => [false, true, true]],
            ['label' => 'Compilación lista para producción', 'type' => 'bool', 'values' => [false, true, true]],
            ['label' => 'Trabajo de nube y fiabilidad', 'type' => 'bool', 'values' => [false, false, true]],
            ['label' => 'Equipo senior integrado', 'type' => 'bool', 'values' => [false, false, true]],
            ['label' => 'Acceso directo a ingenieros senior', 'type' => 'bool', 'values' => [true, true, true]],
        ],
    ],

    'process' => [
        'label' => 'Qué sucede después',
        'title' => 'Del paquete a producción, sin incertidumbre.',
        'subtitle' => 'Cada proyecto sigue el mismo camino claro, sea cual sea el paquete con el que empieces.',
        'steps' => [
            ['label' => 'PASO 01', 'title' => 'Elige tu paquete', 'desc' => 'Elige el proyecto que se ajusta a tu etapa actual.'],
            ['label' => 'PASO 02', 'title' => 'Llamada de alcance', 'desc' => 'Un ingeniero principal confirma el alcance, el cronograma y el ajuste del equipo en un plazo de 2 días hábiles.'],
            ['label' => 'PASO 03', 'title' => 'Arranque y plan de entrega', 'desc' => 'Recibes un plan escrito con hitos antes de que comience cualquier trabajo.'],
            ['label' => 'PASO 04', 'title' => 'Entregar e iterar', 'desc' => 'Lanzamientos regulares, progreso transparente y un camino claro hacia la siguiente etapa.'],
        ],
    ],

    'cta' => [
        'title' => '¿No estás seguro de qué paquete se ajusta?',
        'subtitle' => 'Cuéntanos qué estás construyendo y te recomendaremos el punto de partida correcto en una sesión de trabajo.',
        'button' => 'Habla con nuestro equipo',
    ],
];
