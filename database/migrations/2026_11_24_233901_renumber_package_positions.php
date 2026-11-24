<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Turns each category's free-form sort_order values into positions 1..N, keeping the
     * current display order.
     */
    public function up(): void
    {
        DB::table('packages')
            ->select('category')
            ->distinct()
            ->pluck('category')
            ->each(function (string $category) {
                DB::table('packages')
                    ->where('category', $category)
                    ->orderBy('sort_order')
                    ->orderBy('id')
                    ->pluck('id')
                    ->each(fn (int $id, int $index) => DB::table('packages')->where('id', $id)->update(['sort_order' => $index + 1]));
            });
    }

    /**
     * The previous values carried no meaning beyond their order, which is kept.
     */
    public function down(): void
    {
        //
    }
};
