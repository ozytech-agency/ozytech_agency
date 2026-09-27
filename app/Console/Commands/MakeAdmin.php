<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('app:make-admin {email : The email of an existing user} {--revoke : Remove admin access instead of granting it}')]
#[Description('Grant (or revoke) admin dashboard access for an existing user')]
class MakeAdmin extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $user = User::where('email', $this->argument('email'))->first();

        if (! $user) {
            $this->error("No user found with email [{$this->argument('email')}].");

            return self::FAILURE;
        }

        $user->is_admin = ! $this->option('revoke');
        $user->save();

        $this->info($user->is_admin
            ? "{$user->email} is now an admin."
            : "{$user->email} is no longer an admin.");

        return self::SUCCESS;
    }
}
