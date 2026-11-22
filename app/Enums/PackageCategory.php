<?php

namespace App\Enums;

/**
 * What a package sells: an LLC formation (listed under formation states) or a website.
 */
enum PackageCategory: string
{
    case Llc = 'llc';
    case Website = 'website';
}
