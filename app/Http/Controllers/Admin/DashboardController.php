<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Models\Package;
use App\Models\Post;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'services' => Service::count(),
                'services_published' => Service::published()->count(),
                'packages' => Package::count(),
                'packages_published' => Package::published()->count(),
                'posts' => Post::count(),
                'posts_published' => Post::published()->count(),
                'inquiries' => Inquiry::count(),
            ],
            'latestInquiries' => Inquiry::query()
                ->latest()
                ->limit(8)
                ->get(['id', 'first_name', 'last_name', 'email', 'company', 'topic', 'package', 'status', 'created_at']),
        ]);
    }
}
