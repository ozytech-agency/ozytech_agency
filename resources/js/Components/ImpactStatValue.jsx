import CountUp from '@/Components/CountUp';

/**
 * The impact figures shown on both the Home and About pages, so the two never drift apart.
 * A stat with `text` is shown as-is; the others count up from zero when scrolled into view.
 */
export const IMPACT_STATS = [
    { labelKey: 'home.stats.builder_tenure', target: 4 },
    { labelKey: 'home.stats.systems_shipped', target: 100, suffix: '%' },
    { labelKey: 'home.stats.regions_connected', target: 10, suffix: '+' },
    { labelKey: 'home.stats.partner_retention', text: '24/8' },
];

export default function ImpactStatValue({ stat, className = '' }) {
    if (stat.text) {
        return <span className={className}>{stat.text}</span>;
    }

    return <CountUp target={stat.target} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} className={className} />;
}
