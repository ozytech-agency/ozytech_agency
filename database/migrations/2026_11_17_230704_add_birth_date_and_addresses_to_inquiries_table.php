<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * The columns are nullable so inquiries submitted before these fields existed stay valid;
     * the form request makes the date of birth and address required for new submissions.
     */
    public function up(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->date('date_of_birth')->nullable()->after('phone');
            $table->string('address')->nullable()->after('date_of_birth');
            $table->string('second_address')->nullable()->after('address');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->dropColumn(['date_of_birth', 'address', 'second_address']);
        });
    }
};
