<?php

namespace App\Enums;

/**
 * The US states clients can form their LLC in; packages are listed under one or more of them.
 */
enum FormationState: string
{
    case NewMexico = 'new-mexico';
    case Wyoming = 'wyoming';

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
