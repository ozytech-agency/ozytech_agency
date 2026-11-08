<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Dashboard', [
            'inquiries' => $request->user()
                ->inquiries()
                ->latest()
                ->get(['id', 'topic', 'status', 'llc_name', 'created_at']),
        ]);
    }
}
