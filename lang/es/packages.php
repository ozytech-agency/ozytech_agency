<?php

return [
    'title' => 'Paquetes | OzyTech',
    'meta_description' => 'Compara nuestros paquetes de ingeniería de alcance fijo — Explorar, Construir y Escalar — y encuentra el punto de partida adecuado para tu próximo proyecto de software.',

    'hero' => [
        'kicker' => 'Paquetes OzyTech',
        'title' => 'Elige el punto de partida correcto.',
        'lead' => 'Proyectos enfocados para equipos que quieren avanzar con claridad, sin ceremonias innecesarias.',
    ],

    'cards' => [
        [
            'label' => '01 / Explorar',
            'title' => 'Paquete de crecimiento',
            'best_for' => 'Ideal para claridad en etapas tempranas',
            'description' => 'Convierte una idea compleja en una dirección técnica práctica, un plan de entrega y la siguiente decisión.',
            'features' => [
                'Creación e incorporación de LLC',
                [
                    'text' => 'Sitio web: Shopify, WooCommerce o WordPress',
                    'note' => 'Elige lo que mejor se adapte a tu negocio — una tienda Shopify o WooCommerce si vendes en línea, o un sitio WordPress estándar si no.',
                ],
                [
                    'text' => 'Dominio gratuito',
                    'note' => 'Incluido gratis durante el primer año — elige cualquier nombre de dominio disponible que prefieras.',
                ],
                'Mantenimiento del sitio web durante 1 año',
                [
                    'text' => 'Pasarelas de pago',
                    'note' => 'Stripe, PayPal o un proveedor local — configuramos el que mejor se adapte a tu mercado y a cómo quieres cobrar.',
                ],
            ],
            'cta' => 'Elegir este paquete',
            'price' => ['amount' => '4900 $', 'period' => 'pago único'],
        ],
        [
            'label' => '02 / Construir',
            'title' => 'Paquete Pro',
            'best_for' => 'Ideal para un primer lanzamiento de producto',
            'description' => 'Diseña y lanza una primera versión sólida con las bases de ingeniería para crecer después del lanzamiento.',
            'features' => [
                [
                    'text' => 'Desarrollo SaaS',
                    'note' => 'Una aplicación web multiinquilino con registro seguro, facturación por suscripción y un panel de administración adaptado a tu producto.',
                ],
                [
                    'text' => 'Aplicación móvil',
                    'note' => 'Una app nativa o multiplataforma para iOS y Android, desarrollada y publicada en ambas tiendas.',
                ],
                'Mantenimiento de software durante 1 año',
                [
                    'text' => 'Dominio gratuito',
                    'note' => 'Incluido gratis durante el primer año — elige cualquier nombre de dominio disponible que prefieras.',
                ],
            ],
            'cta' => 'Planifica tu lanzamiento',
            'badge' => 'Más popular',
            'price' => ['amount' => '24 000 $', 'period' => 'desde'],
        ],
        [
            'label' => '03 / Escalar',
            'title' => 'Paquete Ultimate',
            'best_for' => 'Ideal para equipos en crecimiento',
            'description' => 'Fortalece un producto, entorno cloud o equipo existente para la siguiente etapa de demanda.',
            'features' => [
                'Modernización de plataforma',
                'Ingeniería de nube y fiabilidad',
                'Equipo de ingeniería senior integrado',
                [
                    'text' => 'Infraestructura y seguridad dedicadas',
                    'note' => 'Un entorno cloud compatible con SOC2, con monitoreo continuo, copias de seguridad automatizadas y refuerzo de seguridad adaptado a tus necesidades de cumplimiento.',
                ],
                [
                    'text' => 'Soporte prioritario 24/7',
                    'note' => 'Acceso directo a tu equipo de ingeniería con un tiempo de respuesta garantizado ante incidentes, cualquier día de la semana.',
                ],
                'Revisiones estratégicas y de hoja de ruta trimestrales',
            ],
            'cta' => 'Hablemos de escalar',
            'price' => ['amount' => '12 000 $', 'period' => 'al mes'],
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
