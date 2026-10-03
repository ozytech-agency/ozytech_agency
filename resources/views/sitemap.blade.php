<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
@foreach ($urls as $alternates)
@foreach ($locales as $locale)
    <url>
        <loc>{{ $alternates[$locale] }}</loc>
        @foreach ($locales as $altLocale)
        <xhtml:link rel="alternate" hreflang="{{ $altLocale }}" href="{{ $alternates[$altLocale] }}" />
        @endforeach
        <xhtml:link rel="alternate" hreflang="x-default" href="{{ $alternates['en'] }}" />
    </url>
@endforeach
@endforeach
</urlset>
