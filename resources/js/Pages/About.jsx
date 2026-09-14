import { Head, Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import Reveal from '@/Components/Reveal';
import { useTranslations } from '@/lib/translations';

const PRINCIPLE_ICONS = ['architecture', 'forum', 'trending_up'];

const TEAM_PHOTOS = [
    'https://i.pravatar.cc/240?img=12',
    'https://i.pravatar.cc/240?img=47',
    'https://i.pravatar.cc/240?img=32',
    'https://i.pravatar.cc/240?img=65',
    'https://i.pravatar.cc/240?img=8',
    'https://i.pravatar.cc/240?img=54',
];

export default function About() {
    const t = useTranslations();
    const principles = t('about.principles.cards');
    const numbers = t('about.numbers.items');
    const teamMembers = t('about.team.members');

    return (
        <SiteLayout>
            <Head title={t('about.title')} />

            <section className="relative w-full overflow-hidden bg-surface-container-low py-space-4xl">
                <div className="absolute -right-24 -top-40 h-[34rem] w-[34rem] rounded-full bg-secondary-container/15 blur-3xl pointer-events-none" aria-hidden="true"></div>
                <div className="relative max-w-max-width mx-auto px-gutter-mobile lg:px-gutter-desktop">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-space-xs mb-space-lg text-on-surface-variant">
                            <span className="w-2 h-2 rounded-full bg-accent2"></span>
                            <span className="font-label-sm text-label-sm uppercase tracking-widest">{t('about.hero.eyebrow')}</span>
                        </div>
                        <h1 className="font-display-xl text-display-xl-mobile sm:text-display-xl leading-[1.02] tracking-tight text-on-surface">
                            {t('about.hero.title')}
                        </h1>
                        <p className="mt-space-lg max-w-xl text-body-lg text-body-lg text-on-surface-variant leading-relaxed">{t('about.hero.description')}</p>
                        <div className="mt-space-xl flex flex-wrap gap-space-sm">
                            <Link
                                href={route('start-a-project')}
                                className="inline-flex items-center gap-space-xs bg-accent2 text-on-primary font-label-md text-label-md px-space-lg py-space-sm rounded-lg shadow-[0_10px_20px_-5px_rgba(233,87,71,0.35)] transition-all hover:-translate-y-0.5"
                            >
                                {t('about.hero.cta_primary')} <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </Link>
                            <button
                                type="button"
                                onClick={() => document.getElementById('principles')?.scrollIntoView({ behavior: 'smooth' })}
                                className="inline-flex items-center px-space-lg py-space-sm bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded-lg shadow-sm hover:shadow-md transition-all"
                            >
                                {t('about.hero.cta_secondary')}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Reveal as="section" className="w-full py-space-4xl bg-surface">
                <div className="max-w-max-width mx-auto px-gutter-mobile lg:px-gutter-desktop grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-space-2xl items-center">
                    <div className="rounded-2xl overflow-hidden bg-surface-container-high">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkJPdW8obQp1iA3g-wc5kBgMH7qk_IcokPWD0MjBfqm4V1CKxmKh9bV_rHZccMDPGOIsXgWX9C8JcXwMwAc2fuXXXz1BW9VeXqhKZ8HRHXJrA1EOCdLYBJ10S5K4gbPK6RqmPq6pjmVaBIIGLiY9XV57wE8vmtwOKivhI5D2wbfZ1AWBVU23HqnnPfqZchXyMLMrY1Sa2Zaq675rpx1XGOkgtF37kdBRKS6UFHX0MSn3Z4yFrGZE9c"
                            alt="Senior architect working at a dual-monitor workstation"
                            className="w-full aspect-[4/3] object-cover"
                        />
                    </div>
                    <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('about.section1.label')}</span>
                        <h2 className="mt-space-sm font-headline-lg text-headline-lg text-on-surface">{t('about.section1.title')}</h2>
                        <p className="mt-space-md text-on-surface-variant leading-relaxed">{t('about.section1.paragraph1')}</p>
                        <p className="mt-space-md text-on-surface-variant leading-relaxed">{t('about.section1.paragraph2')}</p>
                    </div>
                </div>
            </Reveal>

            <section id="principles" className="w-full py-space-4xl bg-surface-container-low">
                <div className="max-w-max-width mx-auto px-gutter-mobile lg:px-gutter-desktop">
                    <div className="max-w-2xl mb-space-2xl">
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('about.principles.label')}</span>
                        <h2 className="mt-space-sm font-headline-lg text-headline-lg text-on-surface">{t('about.principles.title')}</h2>
                        <p className="mt-space-sm text-on-surface-variant">{t('about.principles.description')}</p>
                    </div>
                    <Reveal as="div" stagger className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                        {principles.map((p, i) => (
                            <article key={p.title} className="h-full p-space-lg bg-surface-container-lowest border border-surface-container rounded-xl">
                                <span className="material-symbols-outlined text-3xl text-secondary">{PRINCIPLE_ICONS[i]}</span>
                                <h3 className="mt-space-md font-headline-sm text-xl font-bold text-on-surface">{p.title}</h3>
                                <p className="mt-space-xs text-on-surface-variant leading-relaxed">{p.description}</p>
                            </article>
                        ))}
                    </Reveal>
                </div>
            </section>

            <Reveal as="section" className="w-full py-space-4xl bg-surface">
                <div className="max-w-max-width mx-auto px-gutter-mobile lg:px-gutter-desktop">
                    <div className="max-w-2xl mb-space-2xl">
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('about.team.label')}</span>
                        <h2 className="mt-space-sm font-headline-lg text-headline-lg text-on-surface">{t('about.team.title')}</h2>
                        <p className="mt-space-sm text-on-surface-variant">{t('about.team.description')}</p>
                    </div>
                    <Reveal as="div" stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-lg">
                        {teamMembers.map((member, i) => (
                            <article key={member.name} className="h-full flex flex-col items-start gap-space-sm bg-surface-container-lowest border border-surface-container rounded-xl p-space-lg">
                                <img src={TEAM_PHOTOS[i]} alt="" className="w-16 h-16 rounded-full object-cover" />
                                <div>
                                    <h3 className="font-headline-sm text-lg font-bold text-on-surface">{member.name}</h3>
                                    <p className="font-label-sm text-label-sm text-secondary">{member.role}</p>
                                </div>
                                <p className="text-sm text-on-surface-variant leading-relaxed">{member.focus}</p>
                            </article>
                        ))}
                    </Reveal>
                </div>
            </Reveal>

            <Reveal as="section" className="w-full py-space-4xl bg-surface-container-low">
                <div className="max-w-max-width mx-auto px-gutter-mobile lg:px-gutter-desktop">
                    <div className="max-w-2xl mb-space-2xl">
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('about.numbers.label')}</span>
                        <h2 className="mt-space-sm font-headline-lg text-headline-lg text-on-surface">{t('about.numbers.title')}</h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-lg">
                        {numbers.map((n) => (
                            <div key={n.label} className="border-t-2 border-accent2 pt-space-md">
                                <strong className="block font-headline-lg text-4xl text-on-surface">{n.value}</strong>
                                <span className="text-on-surface-variant text-sm">{n.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Reveal>

            <section className="w-full py-space-4xl bg-primary-container text-on-primary">
                <div className="max-w-max-width mx-auto px-gutter-mobile lg:px-gutter-desktop flex flex-col md:flex-row items-center justify-between gap-space-xl">
                    <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed-dim">{t('about.cta.label')}</span>
                        <h2 className="mt-space-sm font-headline-lg text-headline-lg max-w-[13ch]">{t('about.cta.title')}</h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-primary-fixed-dim leading-relaxed">{t('about.cta.description')}</p>
                        <Link
                            href={route('start-a-project')}
                            className="mt-space-lg inline-flex items-center gap-space-xs bg-accent2 text-on-primary font-label-md text-label-md px-space-lg py-space-sm rounded-lg shadow-[0_10px_20px_-5px_rgba(233,87,71,0.35)] transition-all hover:-translate-y-0.5"
                        >
                            {t('about.cta.button')} <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}
