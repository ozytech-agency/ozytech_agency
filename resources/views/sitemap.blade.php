<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
@foreach ($urls as $entry)
@foreach ($locales as $locale)
    <url>
        <loc>{{ $entry['alternates'][$locale] }}</loc>
        @if ($entry['lastmod'])
        <lastmod>{{ $entry['lastmod'] }}</lastmod>
        @endif
        @foreach ($locales as $altLocale)
        <xhtml:link rel="alternate" hreflang="{{ $altLocale }}" href="{{ $entry['alternates'][$altLocale] }}" />
        @endforeach
        <xhtml:link rel="alternate" hreflang="x-default" href="{{ $entry['alternates']['en'] }}" />
    </url>
@endforeach
@endforeach
</urlset>
