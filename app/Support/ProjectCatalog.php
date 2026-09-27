<?php

namespace App\Support;

use App\Models\Project;
use App\Models\ProjectImage;

class ProjectCatalog
{
    /**
     * Technology stack for each service's flagship case study. Not
     * user-facing copy, so it lives here rather than in the translation
     * files.
     *
     * @var array<string, list<string>>
     */
    private const TECHNOLOGIES = [
        'software-development' => ['Laravel', 'PostgreSQL', 'Stripe Billing', 'Redis', 'Docker'],
        'mobile-apps' => ['React Native', 'Swift', 'Kotlin', 'Firebase', 'Node.js'],
        'mvp-development' => ['Next.js', 'Supabase', 'Tailwind CSS', 'Vercel'],
        'llc-incorporation' => ['Delaware C-Corp', 'EIN Registration', 'Registered Agent', 'Compliance Filing'],
        'web-development' => ['Laravel', 'Inertia.js', 'React', 'Tailwind CSS'],
        'cms-development' => ['WordPress', 'Custom Blocks', 'PHP', 'MySQL'],
        'shopify-store-development' => ['Shopify', 'Liquid', 'Shopify APIs', 'Klaviyo'],
        'payment-solutions' => ['Stripe Connect', 'PayPal', 'Node.js', 'PostgreSQL'],
        'cloud-management' => ['AWS', 'Grafana', 'Prometheus', 'Terraform'],
        'cloud-migration' => ['AWS', 'Kubernetes', 'Terraform', 'Docker'],
        'it-infrastructure' => ['Cisco Networking', 'Windows Server', 'Active Directory', 'VPN'],
        'cyber-security' => ['SIEM', 'Okta', 'AWS IAM', 'Penetration Testing'],
        'consulting-training' => ['Architecture Review', 'Team Workshops', 'Documentation'],
        'remote-team' => ['Node.js', 'React', 'AWS', 'GraphQL'],
        'data-refinement' => ['Python', 'Apache Airflow', 'dbt', 'Snowflake'],
        'localization' => ['i18next', 'RTL Testing', 'Content Localization'],
        'ecommerce' => ['Shopify Plus', 'Klaviyo', 'ShipStation'],
        'ui-ux-design' => ['Figma', 'Design Systems', 'User Testing'],
        'seo-optimization' => ['Technical SEO', 'Core Web Vitals', 'Content Strategy'],
        'website-maintenance' => ['Laravel', 'New Relic', 'CI/CD', 'Security Patching'],
    ];

    /**
     * @return array{title: string, type: string, summary: string, client: array{name: string, role: string, company: string, subtitle: string, avatar: string}, testimonial: string, problems: list<array{problem: string, solution: string}>, technologies: list<string>, previews: list<array{src: string, alt: string|null}>}|null
     */
    public static function find(string $serviceSlug): ?array
    {
        $service = ServiceCatalog::find($serviceSlug);

        if (! $service || ! self::exists($serviceSlug)) {
            return null;
        }

        return self::build($serviceSlug, $service);
    }

    /**
     * Case studies are still defined in the translation files, so services
     * created from the admin dashboard don't have one yet.
     */
    public static function exists(string $serviceSlug): bool
    {
        return is_array(__("projects.{$serviceSlug}"));
    }

    /**
     * @param  array{gallery: list<string>}  $service
     * @return array{title: string, type: string, summary: string, client: array{name: string, role: string, company: string, subtitle: string, avatar: string}, testimonial: string, problems: list<array{problem: string, solution: string}>, technologies: list<string>, previews: list<array{src: string, alt: string|null}>}
     */
    private static function build(string $serviceSlug, array $service): array
    {
        $data = __("projects.{$serviceSlug}");

        $data['technologies'] = self::TECHNOLOGIES[$serviceSlug] ?? [];
        $data['previews'] = self::previews($serviceSlug, $service['gallery']);
        $data['client']['avatar'] = 'https://ui-avatars.com/api/?name='.urlencode((string) $data['client']['name']).'&background=1F2937&color=fff&size=128&bold=true';

        return $data;
    }

    /**
     * The gallery shown in the project details bottom sheet, sourced from
     * `project_images` (sorted, capped to 4). Services without a migrated
     * gallery yet fall back to their `services.gallery` photos, so a case
     * study never shows an empty carousel.
     *
     * @param  list<string>  $fallbackGallery
     * @return list<array{src: string, alt: string|null}>
     */
    private static function previews(string $serviceSlug, array $fallbackGallery): array
    {
        $project = Project::where('slug', $serviceSlug)->with('images')->first();

        if ($project && $project->images->isNotEmpty()) {
            return $project->images
                ->take(4)
                ->map(fn (ProjectImage $image) => ['src' => $image->url(), 'alt' => $image->alt])
                ->values()
                ->all();
        }

        return collect($fallbackGallery)
            ->take(4)
            ->map(fn (string $src) => ['src' => $src, 'alt' => null])
            ->values()
            ->all();
    }
}
