<?php

namespace App\Support;

use Dom\Element;
use Dom\HTMLDocument;
use Dom\Node;
use Dom\Text;

/**
 * Cleans HTML from the admin rich-text editor before it is stored and later
 * rendered to visitors.
 *
 * The input is parsed with PHP's HTML5 parser and rebuilt from an allowlist:
 * only the formatting the editor toolbar can produce survives, every
 * attribute except a link's href/target is dropped, text is re-escaped, and
 * links may only use safe schemes. Anything unknown is unwrapped (its text
 * kept); scripts and other executable containers are dropped with their content.
 */
class RichText
{
    /**
     * @var list<string>
     */
    private const ALLOWED_TAGS = ['p', 'br', 'h2', 'h3', 'strong', 'b', 'em', 'i', 'u', 's', 'ul', 'ol', 'li', 'blockquote', 'hr', 'a'];

    /**
     * @var list<string>
     */
    private const VOID_TAGS = ['br', 'hr'];

    /**
     * @var list<string>
     */
    private const DROPPED_TAGS = ['script', 'style', 'template', 'iframe', 'frame', 'object', 'embed', 'noscript', 'svg', 'math', 'textarea', 'select', 'button', 'form', 'head', 'title'];

    /**
     * @var list<string>
     */
    private const ALLOWED_LINK_SCHEMES = ['http', 'https', 'mailto', 'tel'];

    public static function sanitize(?string $html): string
    {
        if (blank($html)) {
            return '';
        }

        $document = HTMLDocument::createFromString(
            '<!DOCTYPE html><html><body>'.$html.'</body></html>',
            LIBXML_NOERROR,
            'UTF-8',
        );

        return trim(self::renderChildren($document->body));
    }

    private static function renderChildren(Node $node): string
    {
        $html = '';

        foreach ($node->childNodes as $child) {
            if ($child instanceof Text) {
                $html .= e($child->textContent);

                continue;
            }

            // Comments, processing instructions, etc.
            if (! $child instanceof Element) {
                continue;
            }

            $tag = strtolower($child->localName);

            if (in_array($tag, self::DROPPED_TAGS, true)) {
                continue;
            }

            $inner = self::renderChildren($child);

            if (! in_array($tag, self::ALLOWED_TAGS, true)) {
                $html .= $inner;

                continue;
            }

            if (in_array($tag, self::VOID_TAGS, true)) {
                $html .= "<{$tag}>";

                continue;
            }

            if ($tag === 'a') {
                $html .= self::renderLink($child, $inner);

                continue;
            }

            $html .= "<{$tag}>{$inner}</{$tag}>";
        }

        return $html;
    }

    /**
     * A link keeps its text either way; it only stays a link when its href is safe.
     */
    private static function renderLink(Element $link, string $inner): string
    {
        $href = self::safeHref($link->getAttribute('href'));

        if ($href === null) {
            return $inner;
        }

        $target = $link->getAttribute('target') === '_blank' ? ' target="_blank"' : '';

        return '<a href="'.e($href).'"'.$target.' rel="noopener noreferrer">'.$inner.'</a>';
    }

    private static function safeHref(?string $href): ?string
    {
        $href = trim($href ?? '');

        if ($href === '') {
            return null;
        }

        // Browsers ignore control characters and whitespace inside a scheme ("java\tscript:"), so check without them.
        $compact = strtolower(preg_replace('/[\x00-\x20\x7F]+/', '', $href));

        if (preg_match('/^([a-z][a-z0-9+.\-]*):/', $compact, $matches)) {
            return in_array($matches[1], self::ALLOWED_LINK_SCHEMES, true) ? $href : null;
        }

        // Relative URLs (/en/contact, #section, page) have no scheme to abuse.
        return $href;
    }
}
