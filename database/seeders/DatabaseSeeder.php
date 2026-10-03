<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->seedAdmins();

        $this->call(ContentSeeder::class);
    }

    /**
     * Site owners who sign in with "Continue with Google" and need admin
     * access from their very first login. No usable password is set (a
     * random one, same as accounts Google creates on the fly), since these
     * are Google-only accounts.
     *
     * Safe to re-run: skips any email that already has an account.
     */
    private function seedAdmins(): void
    {
        $admins = [
            ['name' => 'Oussama Driouech', 'email' => 'thedriwsh@gmail.com'],
        ];

        foreach ($admins as $admin) {
            if (User::where('email', $admin['email'])->exists()) {
                continue;
            }

            User::factory()->admin()->create([
                'name' => $admin['name'],
                'email' => $admin['email'],
                'password' => Hash::make(Str::random(40)),
            ]);
        }
    }
}
