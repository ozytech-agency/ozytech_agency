<?php

return [
    'title' => 'Paquetes',
    'meta_description' => 'Descubre los paquetes flexibles de Ozytech Agency para desarrollo web, e-commerce, SaaS, soluciones IT, creación de empresas e integración de pagos.',

    'hero' => [
        'kicker' => 'Paquetes Ozytech Agency',
        'title' => 'Elige el punto de partida correcto.',
        'lead' => 'Ofrecemos paquetes flexibles diseñados en torno a tus objetivos. Elige el punto de partida adecuado y déjanos ayudarte a dar vida a tu visión.',
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
                    'note' => 'Elige lo que mejor se adapte a tu negocio - una tienda Shopify o WooCommerce si vendes en línea, o un sitio WordPress estándar si no.',
                ],
                [
                    'text' => 'Dominio gratuito',
                    'note' => 'Incluido gratis durante el primer año - elige cualquier nombre de dominio disponible que prefieras.',
                ],
                'Mantenimiento del sitio web durante 1 año',
                [
                    'text' => 'Pasarelas de pago',
                    'note' => 'Stripe, PayPal o un proveedor local - configuramos el que mejor se adapte a tu mercado y a cómo quieres cobrar.',
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
                    'note' => 'Incluido gratis durante el primer año - elige cualquier nombre de dominio disponible que prefieras.',
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

    'most_popular' => 'Más popular',
    'old_price' => 'Precio anterior',

    'currencies' => [
        'USD' => ['symbol' => '$', 'format' => ':amount :symbol'],
        'MAD' => ['symbol' => 'MAD', 'format' => ':amount :symbol'],
    ],

    'state_switcher' => [
        'label' => 'Elige el estado de constitución de tu LLC',
        'new_mexico' => 'Nuevo México',
        'wyoming' => 'Wyoming',
        'empty' => 'Todavía no hay paquetes disponibles para este estado.',
        'website' => 'Paquetes de creación web',
        'website_empty' => 'Todavía no hay paquetes web disponibles.',
    ],

    'comparison' => [
        'label' => 'Compara los paquetes',
        'title' => 'Descubre exactamente qué incluye cada etapa.',
        'subtitle' => '¿No sabes qué paquete es el adecuado para tu negocio? Compara nuestras opciones lado a lado para explorar funcionalidades, servicios y beneficios, y encuentra la solución que se ajuste a tus objetivos, tu presupuesto y los requisitos de tu proyecto.',
        'rows' => [
            ['label' => 'Duración típica', 'type' => 'text', 'values' => ['2-4 semanas', '8-12 semanas', 'Continuo, trimestral']],
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
        'subtitle' => 'De tu primera idea a la entrega final, de forma sencilla.',
        'steps' => [
            ['label' => 'PASO 01', 'title' => 'Elige tu paquete', 'desc' => 'Explora nuestros paquetes y elige la solución que mejor se adapte a las necesidades, objetivos y presupuesto de tu negocio.'],
            ['label' => 'PASO 02', 'title' => 'Descubrimiento y consultoría', 'desc' => 'Hablamos sobre tu visión, entendemos tus requisitos e identificamos el enfoque adecuado para tu proyecto.'],
            ['label' => 'PASO 03', 'title' => 'Planificación y desarrollo', 'desc' => 'Nuestro equipo define la hoja de ruta del proyecto, establece los hitos y comienza a construir tu solución con una dirección clara.'],
            ['label' => 'PASO 04', 'title' => 'Lanzamiento y soporte continuo', 'desc' => 'Entregamos tu solución, nos aseguramos de que todo funcione como se espera y te brindamos soporte continuo a medida que tu negocio crece.'],
        ],
    ],

    'cta' => [
        'title' => '¿No estás seguro de qué paquete se ajusta?',
        'subtitle' => 'Cuéntanos qué estás construyendo y te recomendaremos el punto de partida correcto en una sesión de trabajo.',
        'button' => 'Habla con nuestro equipo',
    ],
];
