<?php

namespace App\Http\Controllers\Admin;

use App\Enums\PackageCategory;

/**
 * Manages website packages with the same screens as the LLC packages.
 */
class WebsitePackageController extends PackageController
{
    protected function category(): PackageCategory
    {
        return PackageCategory::Website;
    }

    protected function routeBase(): string
    {
        return 'admin.website-packages';
    }
}
