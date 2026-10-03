<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; color: #1a1a1a;">
    <h2 style="margin-bottom: 4px;">New message from the Ozytech Agency contact form</h2>
    <p style="color: #555; margin-top: 0;">Reply directly to this email to respond to {{ $name }}.</p>

    <table cellpadding="6" cellspacing="0" style="margin: 16px 0;">
        <tr>
            <td style="font-weight: bold;">Name</td>
            <td>{{ $name }}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Email</td>
            <td>{{ $email }}</td>
        </tr>
    </table>

    <p style="font-weight: bold; margin-bottom: 4px;">Message</p>
    <p style="white-space: pre-wrap;">{{ $body }}</p>
</body>
</html>
