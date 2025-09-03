# EmailJS Setup for Contact Form

## Quick Setup (5 minutes)

### 1. Create EmailJS Account

- Go to [EmailJS.com](https://www.emailjs.com/)
- Sign up for a free account
- Verify your email

### 2. Create Email Service

- Click "Email Services" in dashboard
- Click "Add New Service"
- Choose "Gmail" (or your preferred email provider)
- Connect your email account
- Note down the **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template

- Click "Email Templates" in dashboard
- Click "Create New Template"
- Use this template:

```
Subject: New Message from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Message: {{message}}

This message was sent from your portfolio contact form.
```

- Note down the **Template ID** (e.g., `template_xyz789`)

### 4. Get Public Key

- Click "Account" → "API Keys"
- Copy your **Public Key** (e.g., `user_def456`)

### 5. Update Contact.jsx

Replace these placeholders in `src/Components/Contact/Contact.jsx`:

```javascript
// Replace 'YOUR_SERVICE_ID' with your actual Service ID
'YOUR_SERVICE_ID' → 'service_abc123'

// Replace 'YOUR_TEMPLATE_ID' with your actual Template ID
'YOUR_TEMPLATE_ID' → 'template_xyz789'

// Replace 'YOUR_PUBLIC_KEY' with your actual Public Key
'YOUR_PUBLIC_KEY' → 'user_def456'
```

### 6. Test

- Fill out the contact form
- Click "Send Message"
- Check your email inbox

## Free Plan Limits

- 200 emails per month
- Perfect for portfolio websites

## Troubleshooting

- Check browser console for errors
- Verify all IDs are correct
- Ensure EmailJS service is active
- Check spam folder for test emails

That's it! Your contact form will now actually send emails. 🎉
