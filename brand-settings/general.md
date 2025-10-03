---
title: General Settings
---

# General Settings

- [Introduction](#introduction)
- [General Tab](#general-tab)
  - [Basic Information](#basic-information)
  - [Currency & Financial](#currency-financial)
  - [Localization](#localization)
  - [Analytics & Tracking](#analytics-tracking)
- [Business Details Tab](#business-details-tab)
- [Contact & Social Tab](#contact-social-tab)
  - [Support Contact Information](#support-contact-information)
  - [Social Media Profiles](#social-media-profiles)

## Introduction

General Settings configure core brand information including site details, currency, language, business address, and customer support channels.

Access General Settings from **Brand Settings → General** to customize your application's fundamental configuration.

## General Tab

The General tab contains core application settings organized in four sections.

### Basic Information

Configure core settings for your application.

**Site Name**  
Application name appearing in browser title and throughout the system.

- Appears in browser tabs
- Email headers
- System notifications
- Default branding locations

**Default Timezone**  
Timezone for displaying all dates and times (e.g., "(UTC+06:00) Asia/Dhaka").

- Controls payment timestamps
- Report date ranges
- Scheduled tasks
- All system-generated dates

::: tip
Choose the timezone where most of your customers are located or where you operate your business.
:::

### Currency & Financial

Configure currency settings for all financial transactions.

**Default Currency**  
Currency used for all financial transactions (dropdown selection).

- Must match currencies configured in your gateways
- All payments, invoices, and reports use this currency
- Available options: BDT, USD, EUR, etc.

**Currency Symbol**  
Symbol displayed with amounts (automatically set based on selected currency).

- Read-only field
- Automatically populated (e.g., ৳ for BDT, $ for USD)
- Displays before or after amounts depending on currency conventions

::: warning
Changing Default Currency after processing payments can cause reporting inconsistencies. Set this correctly from the start.
:::

### Localization

Configure language and date format preferences.

**Default Language**  
Checkout interface language (e.g., Bangla, English).

- Controls customer-facing checkout page language
- Determines date/time format display
- Admin dashboard language may differ

**Week Starts On**  
First day of week in reports (e.g., Saturday, Sunday, Monday).

- Affects weekly reports and analytics
- Determines first day in calendar views
- Important for accurate weekly revenue calculations

### Analytics & Tracking

Set up tools to monitor traffic and user behavior.

**Google Tag Manager ID**  
Your unique Google Tag Manager container ID (format: GTM-XXXXXXX).

- Enables tracking of customer behavior
- Integrates with Google Analytics
- Tracks conversion events
- Monitors payment flow completion

To find your GTM ID:
1. Log in to Google Tag Manager
2. Select your container
3. Copy the ID from the top of the page (format: GTM-XXXXXXX)

## Business Details Tab

Click the **Business Details** tab to enter company information for invoices and documentation.

**Street Address**  
Street address including building/suite number (e.g., "123 Business Ave").

**City/Town**  
City or town name (e.g., "New York").

**Postal/ZIP Code**  
Postal or ZIP code (e.g., "10001").

**Country**  
Country where your business is registered (dropdown selection).

**Where this appears:**
- Invoice footer
- Payment receipts
- Email signatures
- Official correspondence

::: tip
Complete business details add professionalism to invoices and help customers trust your brand. Even though these fields are optional, filling them is recommended.
:::

## Contact & Social Tab

Click the **Contact & Social** tab to configure customer support channels and social media profiles.

### Support Contact Information

Configure support channels displayed to customers.

**Support Phone Number**  
Customer service phone number with country code (e.g., "123-456-7890").

- Include country code for international customers
- Format: +1234567890
- Appears on payment pages and invoices

**Support Email Address**  
Primary contact email for support inquiries (e.g., "support@yourcompany.com").

- Primary contact for customer support
- Appears on invoices and receipts
- Used for support-related communications

**Support Website**  
Link to your support portal or help center.

- URL prefix `https://` is provided
- Enter your domain (e.g., "help.yourcompany.com")
- Links to documentation or help center

### Social Media Profiles

Link your business social media accounts.

**Facebook Page**  
Your Facebook page username.

- URL prefix: `https://facebook.com/`
- Enter only username (e.g., "yourcompany")
- System constructs full URL automatically

**Facebook Messenger**  
Your Facebook Messenger username.

- URL prefix: `https://m.me/`
- Enter only username
- Enables direct messaging link

**WhatsApp Number**  
WhatsApp number with country code.

- Include + symbol and country code
- Format: +1234567890
- Creates click-to-chat link

**Telegram**  
Your Telegram username.

- URL prefix: `https://t.me/`
- Enter only username
- Links to Telegram profile

**YouTube Channel**  
Your YouTube channel ID or handle.

- URL prefix: `https://youtube.com/`
- Enter channel handle (e.g., "@yourcompany") or channel ID
- Links to YouTube channel

**Where social links appear:**
- Payment confirmation pages
- Invoice footers
- Email templates
- Customer support pages

::: tip
Adding social media links builds customer trust and provides additional support channels. Fill in the platforms where your business is most active.
:::

## Saving Changes

After configuring settings:

1. Review your changes across all tabs
2. Click **Save changes** (blue button at bottom)
3. Wait for confirmation message
4. Changes apply immediately across the system

All three tabs save together, so review all sections before saving.