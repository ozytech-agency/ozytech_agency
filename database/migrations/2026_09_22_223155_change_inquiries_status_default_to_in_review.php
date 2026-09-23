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
     * Replaces the four-state status ('new', 'in_progress', 'responded', 'closed')
     * with a three-state completion status ('in_review', 'in_progress', 'completed').
     */
    public function up(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->string('status')->default('in_review')->change();
        });

        DB::table('inquiries')->where('status', 'new')->update(['status' => 'in_review']);
        DB::table('inquiries')->whereIn('status', ['responded', 'closed'])->update(['status' => 'completed']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->string('status')->default('new')->change();
        });

        DB::table('inquiries')->where('status', 'in_review')->update(['status' => 'new']);
        DB::table('inquiries')->where('status', 'completed')->update(['status' => 'responded']);
    }
};
