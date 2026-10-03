<?php

namespace Tests\Feature;

use App\Mail\ContactFormReceived;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactMessageTest extends TestCase
{
    /**
     * @param  array<string, mixed>  $overrides
     * @return array<string, mixed>
     */
    private function payload(array $overrides = []): array
    {
        return array_merge([
            'name' => 'Amina Benali',
            'email' => 'amina@company.com',
            'message' => 'Just wanted to say hello and ask about your services.',
        ], $overrides);
    }

    public function test_visitor_can_submit_the_contact_form(): void
    {
        Mail::fake();

        $this->post(route('contact.store', ['locale' => 'en']), $this->payload())
            ->assertSessionHasNoErrors();

        Mail::assertQueued(ContactFormReceived::class);
    }

    public function test_submission_is_mailed_to_the_configured_recipient_with_reply_to_the_visitor(): void
    {
        config(['services.contact.recipient' => 'inbox@ozytechagency.com']);
        Mail::fake();

        $this->post(route('contact.store', ['locale' => 'en']), $this->payload());

        Mail::assertQueued(ContactFormReceived::class, fn (ContactFormReceived $mail) => $mail->hasTo('inbox@ozytechagency.com')
            && $mail->hasReplyTo('amina@company.com')
            && $mail->name === 'Amina Benali'
            && $mail->body === 'Just wanted to say hello and ask about your services.');
    }

    public function test_name_is_required(): void
    {
        Mail::fake();

        $this->post(route('contact.store', ['locale' => 'en']), $this->payload(['name' => '']))
            ->assertSessionHasErrors('name');

        Mail::assertNothingQueued();
    }

    public function test_email_must_be_valid(): void
    {
        Mail::fake();

        $this->post(route('contact.store', ['locale' => 'en']), $this->payload(['email' => 'not-an-email']))
            ->assertSessionHasErrors('email');

        Mail::assertNothingQueued();
    }

    public function test_message_is_required(): void
    {
        Mail::fake();

        $this->post(route('contact.store', ['locale' => 'en']), $this->payload(['message' => '']))
            ->assertSessionHasErrors('message');

        Mail::assertNothingQueued();
    }
}
