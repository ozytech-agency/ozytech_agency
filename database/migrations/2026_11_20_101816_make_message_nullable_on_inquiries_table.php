<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Project details became optional on the Start a Project form.
     */
    public function up(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->text('message')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('inquiries')->whereNull('message')->update(['message' => '']);

        Schema::table('inquiries', function (Blueprint $table) {
            $table->text('message')->nullable(false)->change();
        });
    }
};
