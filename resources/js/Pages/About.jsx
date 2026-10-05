import { Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import Reveal from '@/Components/Reveal';
import Seo from '@/Components/Seo';
import { useTranslations } from '@/lib/translations';

const PRINCIPLE_ICONS = ['architecture', 'forum', 'trending_up'];

const TEAM_AVATAR_STYLES = ['bg-secondary-container text-on-secondary-container', 'bg-primary text-on-primary'];

const SOCIAL_ICONS = {
    x: 'fa-brands fa-x-twitter',
    instagram: 'fa-brands fa-instagram',
    linkedin: 'fa-brands fa-linkedin-in',
    website: 'fa-solid fa-globe',
};

function getInitials(name) {
    return name
        .split(' ')
        .map((part) => part.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

export default function About({ teamMembers }) {
    const t = useTranslations();
    const principles = t('about.principles.cards');
    const numbers = t('about.numbers.items');

    return (
        <SiteLayout>
            <Seo title={t('about.title')} description={t('about.hero.description')} breadcrumbs={[{ name: 'About', path: '/about' }]} />

            <section className="relative w-full overflow-hidden py-space-4xl isolate">
                <div className="absolute inset-0 -z-20">
                    <img
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2200&q=85"
                        alt=""
                        aria-hidden="true"
                        fetchpriority="high"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div
                    className="absolute inset-0 -z-10 pointer-events-none"
                    style={{
                        background:
                            'linear-gradient(90deg, rgb(9 14 25 / .88) 0%, rgb(9 14 25 / .68) 48%, rgb(9 14 25 / .34) 100%), linear-gradient(180deg, rgb(9 14 25 / .18), rgb(9 14 25 / .5))',
                    }}
                ></div>
                <div className="absolute -right-24 -top-40 h-[34rem] w-[34rem] rounded-full bg-secondary-container/15 blur-3xl pointer-events-none" aria-hidden="true"></div>
                <div className="relative mx-[6%]">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-space-xs mb-space-lg text-white/80">
                            <span className="w-2 h-2 rounded-full bg-accent2"></span>
                            <span className="font-label-sm text-label-sm uppercase tracking-widest">{t('about.hero.eyebrow')}</span>
                        </div>
                        <h1 className="font-display-xl text-display-xl-mobile sm:text-display-xl leading-[1.02] tracking-tight text-white/[92%]">
                            {t('about.hero.title')}
                        </h1>
                        <p className="mt-space-lg max-w-xl text-body-lg text-body-lg text-white/80 leading-relaxed">{t('about.hero.description')}</p>
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
                <div className="mx-[6%] grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-space-2xl items-center">
                    <div className="rounded-2xl overflow-hidden bg-surface-container-high">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkJPdW8obQp1iA3g-wc5kBgMH7qk_IcokPWD0MjBfqm4V1CKxmKh9bV_rHZccMDPGOIsXgWX9C8JcXwMwAc2fuXXXz1BW9VeXqhKZ8HRHXJrA1EOCdLYBJ10S5K4gbPK6RqmPq6pjmVaBIIGLiY9XV57wE8vmtwOKivhI5D2wbfZ1AWBVU23HqnnPfqZchXyMLMrY1Sa2Zaq675rpx1XGOkgtF37kdBRKS6UFHX0MSn3Z4yFrGZE9c"
                            alt="Senior architect working at a dual-monitor workstation"
                            loading="lazy"
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
                <div className="mx-[6%]">
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
                <div className="mx-[6%]">
                    <div className="max-w-2xl mb-space-2xl">
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('about.team.label')}</span>
                        <h2 className="mt-space-sm font-headline-lg text-headline-lg text-on-surface">{t('about.team.title')}</h2>
                        <p className="mt-space-sm text-on-surface-variant">{t('about.team.description')}</p>
                    </div>
                    {teamMembers.length === 0 ? (
                        <p className="text-on-surface-variant">{t('about.team.empty')}</p>
                    ) : (
                        <Reveal as="div" stagger className="grid grid-cols-1 sm:grid-cols-2 gap-space-lg max-w-3xl">
                            {teamMembers.map((member, i) => (
                                <article key={member.name} className="h-full flex flex-col overflow-hidden bg-surface-container-lowest border border-surface-container rounded-xl">
                                    {member.photo ? (
                                        <img src={member.photo} alt={member.name} className="aspect-square w-full object-cover" />
                                    ) : (
                                        <div
                                            className={`flex aspect-square w-full items-center justify-center font-headline-lg text-5xl font-bold ${TEAM_AVATAR_STYLES[i % TEAM_AVATAR_STYLES.length]}`}
                                            aria-hidden="true"
                                        >
                                            {getInitials(member.name)}
                                        </div>
                                    )}
                                    <div className="flex flex-1 flex-col p-space-lg">
                                        <h3 className="font-headline-sm text-lg font-bold text-on-surface">{member.name}</h3>
                                        <p className="font-label-sm text-label-sm text-secondary">{member.role}</p>
                                        <p className="mt-space-xs text-sm text-on-surface-variant leading-relaxed">{member.focus}</p>
                                        {member.socials.length > 0 && (
                                            <div className="mt-space-md flex items-center gap-space-xs border-t border-surface-container pt-space-md">
                                                {member.socials.map((social) => (
                                                    <a
                                                        key={social.key}
                                                        href={social.href}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        aria-label={`${member.name} on ${social.key}`}
                                                        className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
                                                    >
                                                        <i className={SOCIAL_ICONS[social.key]} aria-hidden="true"></i>
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </Reveal>
                    )}
                </div>
            </Reveal>

            <Reveal as="section" className="w-full py-space-4xl bg-surface-container-low">
                <div className="mx-[6%]">
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

            <section className="relative w-full overflow-hidden py-space-4xl text-on-primary isolate">
                <div className="absolute inset-0 -z-20">
                    <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2200&q=80"
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div
                    className="absolute inset-0 -z-10 pointer-events-none"
                    style={{
                        background:
                            'linear-gradient(90deg, rgb(9 14 25 / .92) 0%, rgb(9 14 25 / .82) 55%, rgb(9 14 25 / .6) 100%), linear-gradient(180deg, rgb(9 14 25 / .3), rgb(9 14 25 / .55))',
                    }}
                ></div>
                <div className="relative mx-[6%] flex flex-col md:flex-row items-center justify-between gap-space-xl">
                    <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed-dim">{t('about.cta.label')}</span>
                        <h2 className="mt-space-sm font-headline-lg text-headline-lg max-w-[13ch]">{t('about.cta.title')}</h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-white/80 leading-relaxed">{t('about.cta.description')}</p>
                        <Link
                            href={route('contact')}
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
