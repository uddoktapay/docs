---
title: Mail Settings
---

# Mail Settings

- [Introduction](#introduction)
- [Mailer Tab](#mailer-tab)
  - [Enable Email Sending](#enable-email-sending)
  - [Common Fields](#common-fields)
  - [SMTP](#smtp)
  - [Sendmail](#sendmail)
  - [Mailgun](#mailgun)
  - [Amazon SES](#amazon-ses)
  - [Postmark](#postmark)
  - [Resend](#resend)
  - [MailerSend](#mailersend)
- [Test Mail Configuration](#test-mail-configuration)
- [Customer Notifications Tab](#customer-notifications-tab)

## Introduction

Mail Settings configure email delivery for your UddoktaPay installation. Choose from multiple mail drivers including SMTP, Sendmail, and popular email service providers.

Access Mail Settings from **Brand Settings → Mail Settings** to configure email delivery and customer notifications.

The page has two tabs: **Mailer** and **Customer Notifications**.

## Mailer Tab

Configure email delivery method and connection settings.

### Enable Email Sending

Master switch controlling all outgoing emails from the system.

**Toggle off:**
- Disables ALL email sending system-wide
- Customer notification emails will not be sent
- Admin notification emails will not be sent
- Payment confirmation emails will not be sent
- No emails from any notification channel

**Toggle on:**
- Enables email sending according to configured driver
- Notifications send based on Customer Notifications settings
- Emails send using selected Mail Driver configuration

::: danger
Disabling email sending affects **all outgoing emails**, including admin notifications from the Notification Channels. Use this only for testing or when you intentionally want to stop all email delivery.
:::

### Common Fields

These fields appear regardless of selected mail driver.

**From Address** (required)  
Email address appearing in the "From" field of all outgoing emails.

- Format: `noreply@example.com`
- Should be a valid email address from your domain
- Recipients see this as the sender

**From Name** (required)  
Display name appearing with the From Address.

- Appears as: "Your App Name <noreply@example.com>"
- Use your brand or application name
- Helps recipients identify emails

### SMTP

Standard email protocol supported by most email servers.

**SMTP Host** (required)  
SMTP server hostname.

- Format: `smtp.example.com`
- Get from your email provider
- Examples: smtp.gmail.com, smtp.office365.com

**SMTP Port** (required)  
SMTP server port number.

- Common ports: 25, 465 (SSL), 587 (TLS), 2525
- Default: 587
- Check with your email provider for correct port

**SMTP Username** (optional)  
Username for SMTP authentication.

- Usually your email address
- Required by most email providers
- Leave blank if authentication not needed

**SMTP Password** (optional)  
Password for SMTP authentication.

- Use your SMTP password or app-specific password
- Eye icon to show/hide password
- Store securely

::: tip
For Gmail, use an App Password instead of your regular password. Enable 2FA and generate an app-specific password from your Google Account settings.
:::

### Sendmail

Uses the sendmail binary installed on your server.

**Sendmail Path** (optional)  
Path to sendmail binary with options.

- Default: `/usr/sbin/sendmail -bs`
- Usually works with default value
- Adjust if sendmail installed in different location

::: warning
Sendmail requires proper server configuration. Most shared hosting environments don't support this method. Use SMTP or an email service provider instead.
:::

### Mailgun

Popular email service provider with API-based delivery.

**Mailgun Domain** (required)  
Your Mailgun sending domain.

- Format: `mg.example.com`
- Get from Mailgun dashboard
- Example: `mg.yourdomain.com`

**Mailgun Secret Key** (required)  
API secret key from Mailgun.

- Starts with "key-" followed by your API key
- Get from Mailgun dashboard → API Keys
- Eye icon to show/hide

**Mailgun Endpoint** (optional)  
API endpoint for your region.

- Default: `api.mailgun.net`
- EU region: `api.eu.mailgun.net`
- Leave empty to use default

### Amazon SES

Amazon Simple Email Service for scalable email delivery.

**AWS Access Key ID** (required)  
20-character AWS access key ID.

- Get from AWS IAM dashboard
- Format: 20 alphanumeric characters
- Requires SES permissions

**AWS Secret Access Key** (required)  
40-character AWS secret access key.

- Get from AWS IAM dashboard
- Eye icon to show/hide
- Keep confidential

**SES Region** (optional)  
AWS region for SES.

- Default: `us-east-1`
- Examples: us-west-2, eu-west-1
- Leave empty to use default region

::: tip
Ensure your AWS IAM user has `ses:SendEmail` and `ses:SendRawEmail` permissions. Verify your sending email address or domain in the SES console before sending.
:::

### Postmark

Fast, reliable transactional email service.

**Postmark Server Token** (required)  
Server API token from Postmark.

- Get from Postmark dashboard → Servers
- Eye icon to show/hide
- Each server has unique token

### Resend

Modern email API for developers.

**Resend API Key** (required)  
API key from your Resend dashboard.

- Get from Resend dashboard → API Keys
- Eye icon to show/hide
- Create separate keys for different environments

### MailerSend

Email delivery service with detailed analytics.

**MailerSend API Key** (required)  
API key from your MailerSend dashboard.

- Get from MailerSend dashboard → API Tokens
- Eye icon to show/hide
- Set appropriate permissions when creating

## Test Mail Configuration

After saving your mail configuration, a **Test Connection** button appears in the page header.

Click **Test Connection** to verify your email settings are working correctly.

### Test Email Modal

The test modal contains:

**Test Email Address** (required)  
Email address where test email will be sent.

- Enter your email address
- You must have access to this inbox
- Used to verify email delivery

**Test Subject**  
Subject line for the test email.

- Default: "Test Email from UddoktaPay"
- Customize if needed
- Helps identify the test email in your inbox

**Test Message**  
Body content of the test email.

- Default: "This is a test email sent from UddoktaPay to verify that the mail configuration is working correctly."
- Customize the message if needed
- Appears in email body

**Actions:**
- **Send Test Email** — Send the test email
- **Cancel** — Close modal without testing

### After Sending

**If successful:**
- Modal closes
- Success message appears
- Check the test email address inbox
- Email should arrive within a few minutes

**If failed:**
- Error message displays
- Check configuration settings
- Verify credentials are correct
- Ensure email provider allows sending

::: tip
Always test your mail configuration after making changes. Send a test email to yourself to verify emails are delivered correctly before relying on the system for customer notifications.
:::

::: warning
Some email providers (like Gmail) may take a few minutes to deliver test emails. If you don't receive the email immediately, wait 5-10 minutes and check your spam folder.
:::

## Customer Notifications Tab

Control which emails are sent to customers.

**Payment Completed**  
Toggle to send/not send email when payment is completed.

- Toggle on: Customer receives confirmation email when payment succeeds
- Toggle off: No email sent for completed payments
- Recommended: Keep enabled


**Payment Pending**  
Toggle to send/not send email when payment is pending.

- Toggle on: Customer receives notification when payment awaiting verification
- Toggle off: No email sent for pending payments
- Useful for non-API gateways with manual verification


::: tip
Enable both notifications for better customer experience.
:::

::: warning
Customer Notifications only work if **Enable Email Sending** is toggled on in the Mailer tab. If email sending is disabled, these toggles have no effect.
:::