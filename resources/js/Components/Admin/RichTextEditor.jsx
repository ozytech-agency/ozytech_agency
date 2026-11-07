import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useRef } from 'react';
import { PROSE_CLASSES } from '@/lib/prose';
import { useTranslations } from '@/lib/translations';

// Only what the server-side sanitizer (App\Support\RichText) keeps; anything else would be stripped on save.
const EXTENSIONS = [
    StarterKit.configure({
        heading: { levels: [2, 3] },
        code: false,
        codeBlock: false,
        link: { openOnClick: false, autolink: true, defaultProtocol: 'https' },
    }),
];

function ToolbarButton({ icon, label, active = false, disabled = false, onClick, children }) {
    return (
        <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            aria-pressed={active}
            title={label}
            className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-1.5 font-label-md text-label-md transition-colors disabled:opacity-40 ${
                active ? 'bg-primary-container text-on-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
        >
            {icon ? <span className="material-symbols-outlined text-lg">{icon}</span> : children}
        </button>
    );
}

/**
 * A Tiptap rich-text editor whose value is an HTML string ('' when empty).
 * It reads `value` only on mount, so give it a `key` to load different content (e.g. per locale).
 */
export default function RichTextEditor({ id, value, onChange, dir = 'ltr', lang, labelledBy, invalid = false }) {
    const t = useTranslations();
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    const editor = useEditor({
        extensions: EXTENSIONS,
        content: value || '',
        // Admin pages are rendered by SSR too; build the editor in the browser only.
        immediatelyRender: false,
        editorProps: {
            attributes: {
                id,
                dir,
                ...(lang ? { lang } : {}),
                ...(labelledBy ? { 'aria-labelledby': labelledBy } : {}),
                'aria-multiline': 'true',
                class: `min-h-[18rem] px-space-md pb-space-md focus:outline-none [&>*:first-child]:mt-space-md ${PROSE_CLASSES}`,
            },
        },
        onUpdate: ({ editor: current }) => onChangeRef.current(current.isEmpty ? '' : current.getHTML()),
    });

    const state = useEditorState({
        editor,
        selector: ({ editor: current }) =>
            current
                ? {
                      h2: current.isActive('heading', { level: 2 }),
                      h3: current.isActive('heading', { level: 3 }),
                      bold: current.isActive('bold'),
                      italic: current.isActive('italic'),
                      underline: current.isActive('underline'),
                      strike: current.isActive('strike'),
                      bulletList: current.isActive('bulletList'),
                      orderedList: current.isActive('orderedList'),
                      blockquote: current.isActive('blockquote'),
                      link: current.isActive('link'),
                      canUndo: current.can().undo(),
                      canRedo: current.can().redo(),
                  }
                : null,
    });

    const chain = () => editor.chain().focus();

    const editLink = () => {
        const previous = editor.getAttributes('link').href ?? '';
        const href = window.prompt(t('admin.editor.link_prompt'), previous);
        if (href === null) return;
        if (href.trim() === '') {
            chain().extendMarkRange('link').unsetLink().run();
            return;
        }
        chain().extendMarkRange('link').setLink({ href: href.trim() }).run();
    };

    return (
        <div
            className={`mt-1 overflow-hidden rounded-lg border bg-surface focus-within:border-secondary-container focus-within:ring-1 focus-within:ring-secondary-container ${
                invalid ? 'border-error' : 'border-outline-variant/50'
            }`}
        >
            <div className="flex flex-wrap items-center gap-0.5 border-b border-outline-variant/30 bg-surface-container-low p-1" role="toolbar" aria-label={t('admin.editor.toolbar')}>
                {editor && state && (
                    <>
                        <ToolbarButton label={t('admin.editor.heading_2')} active={state.h2} onClick={() => chain().toggleHeading({ level: 2 }).run()}>
                            H2
                        </ToolbarButton>
                        <ToolbarButton label={t('admin.editor.heading_3')} active={state.h3} onClick={() => chain().toggleHeading({ level: 3 }).run()}>
                            H3
                        </ToolbarButton>
                        <span className="mx-1 h-5 w-px bg-outline-variant/40" aria-hidden="true"></span>
                        <ToolbarButton icon="format_bold" label={t('admin.editor.bold')} active={state.bold} onClick={() => chain().toggleBold().run()} />
                        <ToolbarButton icon="format_italic" label={t('admin.editor.italic')} active={state.italic} onClick={() => chain().toggleItalic().run()} />
                        <ToolbarButton icon="format_underlined" label={t('admin.editor.underline')} active={state.underline} onClick={() => chain().toggleUnderline().run()} />
                        <ToolbarButton icon="strikethrough_s" label={t('admin.editor.strike')} active={state.strike} onClick={() => chain().toggleStrike().run()} />
                        <span className="mx-1 h-5 w-px bg-outline-variant/40" aria-hidden="true"></span>
                        <ToolbarButton icon="format_list_bulleted" label={t('admin.editor.bullet_list')} active={state.bulletList} onClick={() => chain().toggleBulletList().run()} />
                        <ToolbarButton icon="format_list_numbered" label={t('admin.editor.ordered_list')} active={state.orderedList} onClick={() => chain().toggleOrderedList().run()} />
                        <ToolbarButton icon="format_quote" label={t('admin.editor.blockquote')} active={state.blockquote} onClick={() => chain().toggleBlockquote().run()} />
                        <ToolbarButton icon="horizontal_rule" label={t('admin.editor.divider')} onClick={() => chain().setHorizontalRule().run()} />
                        <span className="mx-1 h-5 w-px bg-outline-variant/40" aria-hidden="true"></span>
                        <ToolbarButton icon="link" label={t('admin.editor.link')} active={state.link} onClick={editLink} />
                        {state.link && <ToolbarButton icon="link_off" label={t('admin.editor.unlink')} onClick={() => chain().extendMarkRange('link').unsetLink().run()} />}
                        <span className="ms-auto flex gap-0.5">
                            <ToolbarButton icon="undo" label={t('admin.editor.undo')} disabled={!state.canUndo} onClick={() => chain().undo().run()} />
                            <ToolbarButton icon="redo" label={t('admin.editor.redo')} disabled={!state.canRedo} onClick={() => chain().redo().run()} />
                        </span>
                    </>
                )}
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
