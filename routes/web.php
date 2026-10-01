<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\PackageController as AdminPackageController;
use App\Http\Controllers\Admin\PostController as AdminPostController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\TeamMemberController as AdminTeamMemberController;
use App\Http\Controllers\Admin\UploadController as AdminUploadController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\AvatarController;
use App\Http\Controllers\ContentMediaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PolicyController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/en');

Route::get('/media/avatars/{filename}', [AvatarController::class, 'show'])->name('avatar.show');
Route::get('/media/content/{filename}', [ContentMediaController::class, 'show'])->name('media.content');

// Kept outside the {locale} prefix: Google's OAuth redirect URI must be one
// fixed, exact URL registered in Google Cloud Console, not one that varies
// per locale. SetLocale still runs (it's global 'web' middleware), so
// route('login') / route('dashboard') below resolve locale via its defaults.
Route::middleware('guest')->group(function () {
    Route::get('/auth/google', [GoogleController::class, 'redirect'])->name('google.login');
    Route::get('/auth/google/callback', [GoogleController::class, 'callback'])->name('google.callback');
});

Route::prefix('{locale}')
    ->where(['locale' => '^(en|ar|fr|es)$'])
    ->group(function () {
        Route::get('/', [PageController::class, 'home'])->name('home');
        Route::get('/about', [PageController::class, 'about'])->name('about');
        Route::get('/contact', [PageController::class, 'contact'])->name('contact');
        Route::get('/blog', [PageController::class, 'blog'])->name('blog');
        Route::get('/blog/{post:slug}', [PostController::class, 'show'])->name('blog.show');
        Route::get('/packages', [PageController::class, 'packages'])->name('packages');
        Route::get('/faq', [PageController::class, 'faq'])->name('faq');
        Route::get('/services/{service}', [ServiceController::class, 'show'])->name('services.show');
        Route::get('/services/{service}/work', [ProjectController::class, 'show'])->name('services.work');
        Route::get('/policies/{policy}', [PolicyController::class, 'show'])->name('policies.show');

        Route::middleware(['auth', 'verified'])->group(function () {
            Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
            Route::delete('/dashboard/requests/{inquiry}', [InquiryController::class, 'destroy'])->name('dashboard.requests.destroy');
        });

        Route::middleware(['auth', 'verified', 'can:access-admin'])
            ->prefix('admin')
            ->name('admin.')
            ->group(function () {
                Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
                Route::resource('services', AdminServiceController::class)->except('show');
                Route::resource('packages', AdminPackageController::class)->except('show');
                Route::resource('posts', AdminPostController::class)->except('show');
                Route::resource('team-members', AdminTeamMemberController::class)->except('show');
                Route::post('/uploads', [AdminUploadController::class, 'store'])->name('uploads.store');
            });

        Route::middleware('auth')->group(function () {
            Route::get('/start-a-project', [PageController::class, 'startAProject'])->name('start-a-project');
            Route::post('/start-a-project', [InquiryController::class, 'store'])->name('start-a-project.store');

            Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
            Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
            Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
            Route::post('/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.avatar.update');
            Route::delete('/profile/avatar', [ProfileController::class, 'destroyAvatar'])->name('profile.avatar.destroy');
        });

        require __DIR__.'/auth.php';
    });
