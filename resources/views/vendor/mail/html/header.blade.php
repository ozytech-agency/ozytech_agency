@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
<img alt="{{ trim($slot) }}" src="{{ asset('images/logo.png') }}" class="logo">
</a>
</td>
</tr>
