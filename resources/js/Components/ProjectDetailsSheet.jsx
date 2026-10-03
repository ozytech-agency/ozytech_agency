import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import ProjectGalleryCarousel from '@/Components/ProjectGalleryCarousel';
import { useTranslations } from '@/lib/translations';

export default function ProjectDetailsSheet({ show, onClose, project }) {
    const t = useTranslations();

    if (!project) {
        return null;
    }

    return (
        <Transition show={show} leave="duration-200">
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
                </TransitionChild>

                <div className="fixed inset-0 flex flex-col justify-end overflow-hidden">
                    <TransitionChild
                        enter="ease-out duration-300"
                        enterFrom="translate-y-full"
                        enterTo="translate-y-0"
                        leave="ease-in duration-250"
                        leaveFrom="translate-y-0"
                        leaveTo="translate-y-full"
                    >
                        <DialogPanel className="mx-auto flex h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-surface shadow-2xl sm:h-[88vh] sm:w-[80%] sm:rounded-t-3xl">
                            <div className="relative shrink-0 border-b border-surface-container pb-space-sm pt-space-sm">
                                <div className="mx-auto h-1.5 w-12 rounded-full bg-surface-container-highest" aria-hidden="true"></div>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    aria-label={t('services.work.close')}
                                    className="absolute right-space-md top-space-sm flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-high text-on-surface transition-colors hover:bg-surface-container-highest"
                                >
                                    <span className="material-symbols-outlined text-xl">close</span>
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto px-gutter-mobile py-space-xl sm:px-space-2xl">
                                <div className="mx-auto flex max-w-[880px] flex-col gap-space-2xl">
                                    <ProjectGalleryCarousel images={project.previews ?? []} title={project.title} />

                                    <div className="flex flex-col gap-space-xs">
                                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{project.type}</span>
                                        <DialogTitle as="h2" className="font-headline-lg text-headline-lg text-on-surface">
                                            {project.title}
                                        </DialogTitle>
                                        <p className="mt-space-xs max-w-[680px] text-on-surface-variant text-body-lg leading-relaxed">{project.summary}</p>
                                    </div>

                                    <div className="flex items-center gap-space-sm rounded-2xl border border-secondary-container/30 bg-secondary-container/10 p-space-lg">
                                        <img src={project.client.avatar} alt={project.client.name} className="h-14 w-14 shrink-0 rounded-full object-cover" />
                                        <div>
                                            <p className="font-headline-sm text-base font-bold text-on-surface">{project.client.name}</p>
                                            <p className="text-sm text-on-surface-variant">{project.client.company}</p>
                                            <span className="mt-1 inline-block font-label-sm text-label-sm uppercase tracking-wide text-secondary font-bold">
                                                {project.client.subtitle}
                                            </span>
                                        </div>
                                    </div>

                                    {project.problems?.length > 0 && (
                                        <div className="flex flex-col gap-space-md">
                                            <h3 className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                                                {t('services.work.problems_label')}
                                            </h3>
                                            <div className="flex flex-col gap-space-md">
                                                {project.problems.map((item, i) => (
                                                    <div key={i} className="flex gap-space-sm rounded-xl border border-surface-container bg-surface-container-lowest p-space-lg">
                                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary-container/10 font-label-sm text-label-sm font-bold text-secondary">
                                                            {String(i + 1).padStart(2, '0')}
                                                        </span>
                                                        <div className="flex flex-1 flex-col gap-space-sm">
                                                            <div>
                                                                <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                                                                    {t('services.work.problem_label')}
                                                                </span>
                                                                <p className="mt-1 text-sm leading-relaxed text-on-surface">{item.problem}</p>
                                                            </div>
                                                            <div className="border-t border-surface-container pt-space-sm">
                                                                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                                                                    {t('services.work.solution_label')}
                                                                </span>
                                                                <p className="mt-1 text-sm leading-relaxed text-on-surface">{item.solution}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-space-md pb-space-lg">
                                        <h3 className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                                            {t('services.work.review_label')}
                                        </h3>
                                        <blockquote className="rounded-2xl border border-surface-container bg-surface-container-lowest p-space-xl">
                                            <div className="mb-space-sm flex items-center gap-1 text-secondary-container" aria-hidden="true">
                                                {[0, 1, 2, 3, 4].map((i) => (
                                                    <span key={i} className="material-symbols-outlined icon-fill text-base">star</span>
                                                ))}
                                            </div>
                                            <p className="font-headline-sm text-lg text-on-surface leading-relaxed">&ldquo;{project.testimonial}&rdquo;</p>
                                            <footer className="mt-space-md flex items-center gap-space-sm">
                                                <img src={project.client.avatar} alt={project.client.name} className="h-10 w-10 shrink-0 rounded-full object-cover" />
                                                <div>
                                                    <p className="text-sm font-bold text-on-surface">{project.client.name}</p>
                                                    <p className="text-sm text-on-surface-variant">
                                                        {project.client.role} · {project.client.company}
                                                    </p>
                                                </div>
                                            </footer>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
}
