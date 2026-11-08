<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * The company field becomes the suggested LLC name and the domain field becomes the
     * client's existing website, so earlier answers are kept under their new meaning.
     */
    public function up(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->renameColumn('company', 'llc_name');
            $table->renameColumn('domain_name', 'website');
        });

        Schema::table('inquiries', function (Blueprint $table) {
            $table->string('second_email')->nullable()->after('email');
            $table->string('second_llc_name')->nullable()->after('llc_name');
            $table->dropColumn('nda_requested');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->boolean('nda_requested')->default(false)->after('referral');
            $table->dropColumn(['second_email', 'second_llc_name']);
        });

        Schema::table('inquiries', function (Blueprint $table) {
            $table->renameColumn('llc_name', 'company');
            $table->renameColumn('website', 'domain_name');
        });
    }
};
