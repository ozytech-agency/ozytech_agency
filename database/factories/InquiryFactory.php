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
            'phone' => fake()->e164PhoneNumber(),
            'company' => fake()->company(),
            'website' => fake()->url(),
            'role' => fake()->jobTitle(),
            'company_size' => fake()->randomElement(['Just me / pre-team', '2–10', '11–50', '51–200', '201–1,000', '1,000+']),
            'services' => fake()->randomElements(['IT Solutions & Cloud', 'Full Stack Web', 'Mobile Apps', 'SaaS Product'], 2),
            'budget' => fake()->randomElement(['Under $25k', '$25k – $75k', '$75k – $150k', '$150k – $500k', '$500k+', 'Not sure yet']),
            'timeline' => fake()->randomElement(['ASAP / urgent', 'Within 1 month', '1–3 months', '3–6 months', 'Exploratory']),
            'message' => fake()->paragraph(),
            'referral' => fake()->randomElement(['Referral / word of mouth', 'Search engine', 'LinkedIn', 'Other']),
            'nda_requested' => fake()->boolean(),
            'consent' => true,
            'status' => 'new',
        ];
    }
}
