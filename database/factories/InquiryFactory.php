<?php

namespace Database\Factories;

use App\Models\Inquiry;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Inquiry>
 */
class InquiryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => null,
            'topic' => fake()->randomElement(['new-project', 'partnership', 'support', 'careers', 'press', 'general']),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->safeEmail(),
            'second_email' => fake()->optional()->safeEmail(),
            'phone' => fake()->e164PhoneNumber(),
            'date_of_birth' => fake()->dateTimeBetween('-70 years', '-18 years')->format('Y-m-d'),
            'address' => fake()->streetAddress().', '.fake()->city(),
            'second_address' => fake()->optional()->secondaryAddress(),
            'llc_name' => fake()->company().' LLC',
            'second_llc_name' => fake()->optional()->company(),
            'website' => fake()->optional()->domainName(),
            'role' => fake()->jobTitle(),
            'work_area' => fake()->randomElement(['Technology & SaaS', 'E-commerce & Retail', 'Finance & Fintech', 'Healthcare', 'Education', 'Other']),
            'package' => fake()->randomElement(['growth', 'pro', 'ultimate']),
            'message' => fake()->paragraph(),
            'referral' => fake()->randomElement(['Referral / word of mouth', 'Search engine', 'LinkedIn', 'Other']),
            'consent' => true,
            'status' => 'in_review',
        ];
    }
}
