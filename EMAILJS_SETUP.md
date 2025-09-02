# EmailJS Setup Guide for Portfolio Connect Form

This guide will help you set up EmailJS to send emails directly from your portfolio's Connect form.

## 🚀 What is EmailJS?

EmailJS allows you to send emails directly from JavaScript without a backend server. It integrates with popular email services like Gmail, Outlook, and others.

## 📋 Prerequisites

- A Gmail account (or other supported email service)
- Your portfolio deployed on Netlify (or any hosting service)

## 🔧 Step-by-Step Setup

### 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### 2. Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **"Add New Service"**
3. Choose **Gmail** (recommended for personal use)
4. Click **"Connect Account"**
5. Authorize EmailJS to access your Gmail account
6. Give your service a name (e.g., "Portfolio Gmail")
7. Copy the **Service ID** (you'll need this later)

### 3. Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **"Create New Template"**
3. Choose **"Blank Template"**
4. Set up your template:

**Template Name:** Portfolio Contact Form

**Subject:**

```
Portfolio Contact from {{from_name}}
```

**Content:**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Portfolio Contact</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #854ce6;">New Portfolio Contact</h2>

      <div
        style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;"
      >
        <h3 style="margin-top: 0; color: #495057;">Contact Details</h3>
        <p><strong>Name:</strong> {{from_name}}</p>
        <p><strong>Email:</strong> {{from_email}}</p>
      </div>

      <div
        style="background: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 10px;"
      >
        <h3 style="margin-top: 0; color: #495057;">Message</h3>
        <p style="white-space: pre-wrap;">{{message}}</p>
      </div>

      <div
        style="margin-top: 30px; padding: 15px; background: #e9ecef; border-radius: 8px; font-size: 14px; color: #6c757d;"
      >
        <p style="margin: 0;">
          This message was sent from your portfolio contact form.
        </p>
        <p style="margin: 5px 0 0 0;">Timestamp: {{timestamp}}</p>
      </div>
    </div>
  </body>
</html>
```

5. Save the template
6. Copy the **Template ID** (you'll need this later)

### 4. Get Your Public Key

1. In your EmailJS dashboard, go to **Account** → **API Keys**
2. Copy your **Public Key**

### 5. Set Up Environment Variables

#### For Local Development:

Create a `.env.local` file in your project root:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

#### For Netlify Production:

1. Go to your Netlify dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add these variables:
   - `REACT_APP_EMAILJS_SERVICE_ID` = your_service_id
   - `REACT_APP_EMAILJS_TEMPLATE_ID` = your_template_id
   - `REACT_APP_EMAILJS_PUBLIC_KEY` = your_public_key

### 6. Test Your Setup

1. Start your development server: `npm start`
2. Open the Connect form
3. Fill out the form and submit
4. Check your email for the message
5. Check the browser console for success/error logs

## 🔍 Troubleshooting

### Common Issues:

#### 1. "Service ID not found"

- Verify your service ID is correct
- Ensure the service is properly connected to your email account

#### 2. "Template ID not found"

- Check your template ID
- Make sure the template is saved and published

#### 3. "Public key invalid"

- Verify your public key is correct
- Check if you've copied the entire key

#### 4. Emails not sending

- Check browser console for error messages
- Verify all environment variables are set correctly
- Ensure your email service is properly connected

#### 5. CORS errors

- EmailJS handles CORS automatically
- If you see CORS errors, check your EmailJS configuration

### Debug Mode:

The form includes console logging. Check your browser's developer console for:

- EmailJS initialization logs
- Success/error messages
- Detailed error information

## 📱 Mobile Testing

Test the form on mobile devices to ensure:

- Form fields are properly sized
- Touch interactions work correctly
- Error messages are visible
- Success flow works as expected

## 🔒 Security Considerations

- **Rate Limiting**: EmailJS has built-in rate limits
- **Spam Protection**: Consider adding CAPTCHA for production use
- **Input Validation**: The form includes basic validation
- **Environment Variables**: Never commit API keys to Git

## 💰 Pricing

EmailJS offers a generous free tier:

- **Free**: 200 emails/month
- **Paid Plans**: Start at $15/month for 1,000 emails

For a portfolio site, the free tier should be sufficient.

## 🚀 Next Steps

Once EmailJS is working:

1. **Customize the email template** to match your brand
2. **Add form validation** (already included)
3. **Implement spam protection** if needed
4. **Add analytics** to track form submissions
5. **Test thoroughly** before deploying to production

## 📞 Support

If you encounter issues:

1. Check the [EmailJS documentation](https://www.emailjs.com/docs/)
2. Review the browser console for error messages
3. Verify all configuration values are correct
4. Contact EmailJS support if needed

---

**Note:** Replace all placeholder values (like `your_service_id_here`) with your actual EmailJS credentials.
