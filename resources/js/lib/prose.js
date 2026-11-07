// Typography for rendered rich content (blog bodies, policies, and the admin rich-text editor),
// so what an admin edits looks the same as what visitors read.
export const PROSE_CLASSES = [
    'text-body-lg leading-relaxed text-on-surface-variant',
    '[&_p]:mt-space-md',
    '[&_h2]:mt-space-xl [&_h2]:font-headline-sm [&_h2]:text-headline-sm [&_h2]:text-on-surface',
    '[&_h3]:mt-space-lg [&_h3]:font-headline-sm [&_h3]:text-xl [&_h3]:text-on-surface',
    '[&_ul]:mt-space-md [&_ul]:list-disc [&_ul]:ps-6 [&_ol]:mt-space-md [&_ol]:list-decimal [&_ol]:ps-6 [&_li]:mt-space-2xs',
    '[&_a]:text-secondary [&_a]:underline hover:[&_a]:text-on-surface',
    '[&_strong]:text-on-surface',
    '[&_blockquote]:mt-space-md [&_blockquote]:border-s-4 [&_blockquote]:border-accent2 [&_blockquote]:ps-space-md [&_blockquote]:italic',
    '[&_code]:rounded [&_code]:bg-surface-container-high [&_code]:px-1 [&_code]:text-sm',
    '[&_pre]:mt-space-md [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-surface-container-high [&_pre]:p-space-md',
    '[&_hr]:mt-space-lg [&_hr]:border-outline-variant/50',
    '[&_img]:mt-space-md [&_img]:rounded-xl',
].join(' ');
