<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Translatable columns are JSON objects keyed by locale (en, ar, fr, es).
     */
    public function up(): void
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->json('label');
            $table->json('title');
            $table->json('best_for');
            $table->json('description');
            $table->json('cta');
            $table->json('badge')->nullable();
            $table->string('icon')->nullable();
            $table->string('price_amount');
            $table->json('price_period');
            $table->boolean('is_featured')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        Schema::create('package_features', function (Blueprint $table) {
            $table->id();
            $table->foreignId('package_id')->constrained()->cascadeOnDelete();
            $table->json('text');
            $table->json('note')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('package_features');
        Schema::dropIfExists('packages');
    }
};
