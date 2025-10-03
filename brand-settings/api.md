---
title: API Settings
---

# API Settings

- [Introduction](#introduction)
- [Create API Key](#create-api-key)
  - [API abilities](#api-abilities)
  - [After creation](#after-creation)
- [Edit API Key](#edit-api-key)
- [API Endpoints](#api-endpoints)
- [API Best Practices](#api-best-practices)

## Introduction

API Settings allow you to create and manage API keys for integrating UddoktaPay with external applications, websites, or services. Each API key has specific abilities that control which operations it can perform.

Access API Settings from **Brand Settings → API Settings** to manage your integration credentials.

## Create API Key

Click **New api key** to create a new API credential.

### API Key Fields

**Name** (required)  
Descriptive identifier for this key (e.g., "Production Website", "Mobile App", "Development").

- Helps you identify where the key is used
- Not visible in API requests
- Used only for your reference

**Abilities** (required)  
Select one or more permissions for this key:

### API Abilities

**payment:checkout**  
Create payment checkout sessions.

- Initiates new payment requests
- Generates checkout URLs
- Required for accepting payments

**payment:verify**  
Verify payment status and retrieve payment details.

- Check if payment is completed
- Get transaction information
- Query payment records

**payment:refund**  
Process full or partial refunds.

- Issue refunds to customers
- Requires completed payments
- Updates payment status

::: tip
**For non-developers:** If you're unsure which abilities to select, create an API key with all three abilities (`payment:checkout`, `payment:verify`, `payment:refund`). This ensures your integration has full access to all payment operations.
:::

**Expires at** (optional)  
Set an expiration date for the key (dd/mm/yyyy format).

- Leave blank for keys that never expire
- Useful for temporary integrations
- Key automatically deactivates after expiration

**Is active** (toggle)  
Enable or disable the key immediately.

- Toggle on to activate
- Toggle off to deactivate
- Default: Active

### After Creation

**CRITICAL: Save Your API Key Immediately**

After clicking Create, a popup modal displays your new API key **one time only**.

**What happens:**
1. Modal appears with your full API key string
2. Copy button available to copy the key
3. You can view the key in this modal only
4. Once you close the modal, the key is **never shown again**

**You must:**
- Copy the API key immediately
- Store it securely (password manager, environment variables, secure notes)
- Never share it publicly or commit it to version control

**If you lose the key:**
- You cannot retrieve it again
- The key is permanently hidden after the modal closes
- You must create a new API key
- Delete the old key if you can't use it

::: danger
**The API key is shown only once immediately after creation.** There is no way to view it again. If you close the modal without copying the key, you must create a new one.
:::

## Edit API Key

Click **Edit** from the actions menu to modify an existing API key.

### Editable Fields

**Name**  
Update the descriptive identifier for the key.

- Change as your integration evolves
- Does not affect the actual key value
- Helps track usage across multiple keys

**Abilities**  
Modify permissions granted to this key.

- Check/uncheck abilities as needed
- Add new permissions for expanded functionality
- Remove permissions to restrict access

**Common permission changes:**
- Start with `payment:checkout` only, add `payment:verify` later
- Remove `payment:refund` if integration shouldn't process refunds
- Grant all three abilities for full-featured integrations

**Expires at**  
Update or remove expiration date.

- Set expiration for temporary access
- Clear field to make key permanent
- Extend expiration for ongoing integrations

**Is active**  
Enable or disable the key.

- Deactivate to temporarily suspend access
- Reactivate when ready to resume
- Alternative to deleting when troubleshooting

::: tip
You can change abilities without creating a new API key. If your integration needs expanded permissions, just edit the existing key and add the required abilities.
:::

::: warning
**You cannot view or change the actual API key value.** Editing only modifies the name, abilities, expiration, and active status. The key itself remains the same (and hidden).
:::

## API Endpoints

Click **Show API Endpoints** to view all available API URLs.

Each endpoint includes:
- Full URL with copy button
- Description of its purpose
- Usage context

::: tip
Click the copy icon next to each endpoint to copy the URL to your clipboard. These endpoints are used with your API key for authentication.
:::

## API Best Practices

**Creating API Keys:**

- **Save immediately** — Copy the key the moment it appears, you cannot retrieve it later
- **Use descriptive names** — "Production Website" is clearer than "Key 1"
- **Minimum permissions** — Only grant abilities the integration needs
- **Separate keys per integration** — Different key for website, mobile app, etc.
- **Set expiration for testing** — Temporary keys auto-expire

**Security:**

- **Store keys securely** — Use password managers or environment variables
- **Never commit to version control** — Add API keys to .gitignore
- **Never share publicly** — Don't include in client-side code or forums
- **Rotate regularly** — Create new keys periodically and revoke old ones
- **Revoke unused keys** — Delete or deactivate old integrations

**For non-developers:**

- **Start with all abilities** — Grant `payment:checkout`, `payment:verify`, and `payment:refund`
- **Copy and save immediately** — The key shows only once after creation
- **Store in safe location** — Password manager or secure notes app
- **Contact developer** — Get help implementing API integration
- **Don't panic if lost** — Just create a new key and delete the old one

**Managing Keys:**

- **Edit abilities as needed** — Add or remove permissions without creating new keys
- **Use active toggle** — Temporarily disable instead of deleting
- **Track expiration dates** — Renew keys before they expire
- **Test after editing** — Verify integration still works after permission changes

**Monitoring:**

- **Check API Documentation** — Review integration guides regularly
- **Test endpoints** — Verify endpoints work before going live
- **Monitor active status** — Ensure critical keys remain active
- **Keep keys organized** — Use clear names to track usage

::: tip
If you're integrating UddoktaPay with your website or application, click [API Documentation](https://developer.uddoktapay.com) for complete integration guides, code examples, and best practices.
:::

::: danger
**Critical Reminders:**
1. API keys are shown **only once** after creation
2. Copy and save the key immediately
3. You cannot retrieve it later
4. If lost, you must create a new key
5. Never share keys publicly or commit to version control
:::
