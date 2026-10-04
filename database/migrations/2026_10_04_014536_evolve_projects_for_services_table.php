<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Turn the one-case-study-per-service table into a portfolio where each
     * service owns many projects. project_images is dropped: a project's
     * gallery is now a single featured image.
     */
    public function up(): void
    {
        Schema::dropIfExists('project_images');

        Schema::table('projects', function (Blueprint $table) {
            $table->foreignId('service_id')->after('id')->constrained()->cascadeOnDelete();
            $table->json('title')->after('service_id');
            $table->json('short_description')->nullable()->after('title');
            $table->json('description')->after('short_description');
            $table->string('client_name')->nullable()->after('description');
            $table->string('project_url')->nullable()->after('client_name');
            $table->string('featured_image')->nullable()->after('project_url');
            $table->string('status', 20)->default('draft')->after('featured_image');
            $table->unsignedInteger('display_order')->default(0)->after('status');

            $table->index(['service_id', 'status', 'display_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropIndex(['service_id', 'status', 'display_order']);
            $table->dropConstrainedForeignId('service_id');
            $table->dropColumn(['title', 'short_description', 'description', 'client_name', 'project_url', 'featured_image', 'status', 'display_order']);
        });

        Schema::create('project_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->string('image');
            $table->string('alt')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }
};
