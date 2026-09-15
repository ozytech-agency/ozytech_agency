<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Home');
    }

    public function about(): Response
    {
        return Inertia::render('About');
    }

    public function startAProject(): Response
    {
        return Inertia::render('StartAProject');
    }

    public function contact(): Response
    {
        return Inertia::render('Contact');
    }

    public function blog(): Response
    {
        return Inertia::render('Blog');
    }

    public function packages(): Response
    {
        return Inertia::render('Packages');
    }

    public function faq(): Response
    {
        return Inertia::render('Faq');
    }
}
