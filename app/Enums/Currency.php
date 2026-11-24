<?php

namespace App\Enums;

/**
 * Currencies a package price can be shown in. Each one's symbol and its place around the
 * amount are set per language in lang/{locale}/packages.php under `currencies`.
 */
enum Currency: string
{
    case Usd = 'USD';
    case Mad = 'MAD';
}
