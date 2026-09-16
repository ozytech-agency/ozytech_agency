<?php

use App\Http\Controllers\AvatarController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PolicyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/en');

Route::get('/media/avatars/{filename}', [AvatarController::class, 'show'])->name('avatar.show');

Route::prefix('{locale}')
    ->where(['locale' => '^(en|ar|fr|es)$'])
    ->group(function () {
        Route::get('/', [PageController::class, 'home'])->name('home');
        Route::get('/about', [PageController::class, 'about'])->name('about');
        Route::get('/start-a-project', [PageController::class, 'startAProject'])->name('start-a-project');
        Route::post('/start-a-project', [InquiryController::class, 'store'])->name('start-a-project.store');
        Route::get('/contact', [PageController::class, 'contact'])->name('contact');
        Route::get('/blog', [PageController::class, 'blog'])->name('blog');
        Route::get('/packages', [PageController::class, 'packages'])->name('packages');
        Route::get('/faq', [PageController::class, 'faq'])->name('faq');
        Route::get('/services/{service}', [ServiceController::class, 'show'])->name('services.show');
        Route::get('/policies/{policy}', [PolicyController::class, 'show'])->name('policies.show');

        Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

        Route::middleware('auth')->group(function () {
            Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
            Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
            Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
            Route::post('/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.avatar.update');
            Route::delete('/profile/avatar', [ProfileController::class, 'destroyAvatar'])->name('profile.avatar.destroy');
        });

        require __DIR__.'/auth.php';
    });
