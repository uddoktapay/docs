---
title: Post-Installation Configuration
---

# Post-Installation Setup

After installation completes, configure these essential settings:

### 1. Validate License

1. Go to **Administration → License**
2. Click **Validate License**
3. Enter your license key from my.uddoktapay.com
4. Click **Submit**

[License Documentation →](/administration/license.md)

### 2. Configure Cron Job

Background tasks require a cron job running every minute.

[Cron Job Setup →](/system-settings/cron-job.md)

Without a cron job, notifications won't send and scheduled tasks won't run.

### 3. Brand Settings

Configure your brand identity:

- **General** — Site name, timezone, currency, language
- **Logo & Favicon** — Upload branding images
- **Mail Settings** — SMTP or email provider configuration
- **API Settings** — Generate API keys for integrations

[Brand Settings Overview →](/brand-settings/overview.md)

### 4. Payment Gateways

Add payment methods:

**Automatic Gateways:**  
API-based integrations (bKash, Nagad, Rocket, PayPal, Stripe, etc.)

**Bank Gateways:**  
Manual bank transfers with proof of payment upload

[Gateway Setup Guide →](/gateways.md)

### 5. Notification Channels

Configure alerts for payment events:

- **Database** — In-dashboard notifications
- **Mail** — Email alerts to admins
- **Telegram** — Instant messaging alerts
- **Slack/Discord** — Team channel notifications
- **Webhook** — Custom integrations (n8n, Make, Zapier)

[Notification Setup →](/brand-settings/notifications.md)

## Test Your Setup

After basic configuration, create a test payment:

**Option 1: Payment Link**

1. Go to **Payment Links → New payment link**
2. Enter amount and customer details
3. Generate and test the payment link

**Option 2: Invoice**

1. Go to **Invoices → New invoice**
2. Add customer information
3. Add line items
4. Send invoice to customer

Test the complete payment flow to ensure everything works correctly.

## Optional Configuration

### Multi-Brand Setup

Run multiple storefronts from one installation:

[Brands Configuration →](/administration/brands.md)

### Team Management

Add staff members with specific permissions:

[Staff Management →](/system-settings/staff-management.md)  
[Access Roles →](/system-settings/access-roles.md)

*Requires Role Management addon*

### Customize Appearance

Modify checkout page design:

[Themes →](/brand-settings/themes.md)

### SMS Data Integration

Automatic payment verification via SMS:

[SMS Data Setup →](/sms-data.md)

*Optional but recommended for automatic verification*

**Need Assistance?**  
Contact support through your client area at [my.uddoktapay.com](https://my.uddoktapay.com).