<?php

use App\Enums\FormationState;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * The LLC formation states a package is listed under. Existing packages are
     * put under every state so none disappear from the site.
     */
    public function up(): void
    {
        Schema::table('packages', function (Blueprint $table) {
            $table->json('formation_states')->nullable()->after('price_period');
        });

        DB::table('packages')->update(['formation_states' => json_encode(FormationState::values())]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('packages', function (Blueprint $table) {
            $table->dropColumn('formation_states');
        });
    }
};
