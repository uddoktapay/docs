---
title: License
---

# License

- [Introduction](#introduction)
- [First-Time Setup](#first-time-setup)
- [After Renewal](#after-renewal)
- [After Domain Changes](#after-domain-changes)
- [After Purchasing Addons](#after-purchasing-addons)
- [Moving to a New Domain](#moving-to-a-new-domain)
- [Switching License Keys](#switching-license-keys)
- [Understanding the License Page](#understanding-the-license-page)
- [Troubleshooting](#troubleshooting)

## Introduction

The License page manages your UddoktaPay license validation and domain authorization. All license changes happen at [my.uddoktapay.com](https://my.uddoktapay.com) in the client area. The License page in your panel simply pulls and displays that information.

Access License from **Administration → License**.

**Key principle:** After ANY change in the client area, click **Refresh License** in your panel to sync the latest data.

## First-Time Setup

When you first install UddoktaPay, the license page shows "No License Found".

**Steps:**

1. Click **Validate License** (blue button, top right)
2. Enter your license key from [my.uddoktapay.com](https://my.uddoktapay.com)
3. Click **Submit**
4. License validates and all information loads

Your panel is now active and ready to use.

## After Renewal

When you renew your license in the client area, the expiration date doesn't update automatically in your panel.

**Steps:**

1. Complete renewal at [my.uddoktapay.com](https://my.uddoktapay.com)
2. Return to **Administration → License** in your panel
3. Click **Refresh License**
4. New expiration date appears

That's it. No other configuration needed.

## After Domain Changes

### Updating API Access Domains

If you change which domains can make API calls:

1. Update "Authorized API Domain" at [my.uddoktapay.com](https://my.uddoktapay.com) → Service Details
2. Return to **Administration → License**
3. Click **Refresh License**
4. New domains appear in API Access Domains section

Your API calls from the new domain will now work.

::: warning
**Critical:** The domain in your API requests must **exactly match** an authorized API domain. This includes:
- Subdomain presence (`www.example.com` ≠ `example.com`)
- Protocol differences don't matter (http vs https)
- Trailing slashes don't matter
:::

## After Purchasing Addons

When you purchase additional features (Liquid, Orderbox, Role Management, etc.):

1. Complete purchase at [my.uddoktapay.com](https://my.uddoktapay.com)
2. Return to **Administration → License**
3. Click **Refresh License**
4. New addons appear in Available Addons section
5. Features are immediately accessible

## Moving to a New Domain

If you're moving your panel installation to a completely new domain:

**Steps:**

1. **In client area** ([my.uddoktapay.com](https://my.uddoktapay.com)):
   - Go to Service Details
   - Click **Reset Panel Domain**

2. **Configure DNS/Hosting:**
   - Point new domain to your server
   - Use same document root as panel
   - Install SSL certificate

3. **In panel** (access via OLD domain first):
   - Go to **Administration → License**
   - Click **Refresh License**
   - New domain appears in authorized list

4. Access panel from new domain

## Switching License Keys

To use a different license key on this installation:

1. Click **Clear License**
2. Confirm removal
3. License information clears
4. Click **Validate License**
5. Enter new license key
6. Click **Submit**

New license is now active.

::: danger
Clearing the license immediately deactivates your panel. Only do this if you have a new valid license key ready to enter.
:::

## Understanding the License Page

The license page displays information pulled from the licensing server. You cannot edit anything here—all changes happen at [my.uddoktapay.com](https://my.uddoktapay.com).

### License Status

Shows three cards:

**Status:**
- Active / Inactive / Expired
- License type below (Regular, Extended, Lifetime)

**Licensed To:**
- Registered name and email

**Expiration:**
- Specific date or "Never Expires" for lifetime licenses
- Time remaining displayed

### Domain Authorization

**Unlimited license:**
- Any domain can access panel

**Limited license:**
- Shows specific authorized domains

### API Access Domains

**Unlimited license:**
- Any domain can make API calls

**Limited license:**
- Shows specific authorized API domains

### Available Addons

Green cards showing included features:
- Liquid, Orderbox, Role Management, etc.
- Based on your license package

### License Information

Technical details:
- **License Key** — Partially masked for security
- **License Type** — Regular, Extended, Lifetime
- **Last Validation** — Online/Offline status with timestamp

## Troubleshooting

### API calls fail with "Domain not allowed"

**Error message:**
```json
{
  "status": false,
  "message": "Domain not allowed for API access. Requested domain: app.example.com, Allowed domains: example.com"
}
```

**Fix:**
1. Note the exact "Requested domain" in error
2. Go to [my.uddoktapay.com](https://my.uddoktapay.com) → Service Details
3. Update "Authorized API Domain" to match requested domain exactly
4. Save changes
5. Return to panel → **Administration → License**
6. Click **Refresh License**
7. Retry API call

### Can't access panel after moving domains

**Problem:** Panel won't load on new domain.

**Fix:**
1. Access panel using the OLD domain (still authorized)
2. Go to [my.uddoktapay.com](https://my.uddoktapay.com) → Service Details
3. Click **Reset Panel Domain**
4. Return to panel (via old domain)
5. Click **Refresh License**
6. Access panel from new domain

### Expiration date not updating after renewal

**Problem:** Still shows old expiration date.

**Fix:**
1. Verify renewal payment completed at [my.uddoktapay.com](https://my.uddoktapay.com)
2. Go to **Administration → License**
3. Click **Refresh License**
4. Date updates immediately

### License shows Inactive

**Problem:** "Inactive" status.

**Fix:**
1. Click **Validate License**
2. Enter license key from [my.uddoktapay.com](https://my.uddoktapay.com)
3. Click **Submit**
4. Status changes to Active

### Addon not appearing after purchase

**Problem:** Purchased addon doesn't show.

**Fix:**
1. Confirm purchase completed at [my.uddoktapay.com](https://my.uddoktapay.com)
2. Go to **Administration → License**
3. Click **Refresh License**
4. Addon appears in Available Addons

### Last Validation: Offline

**Problem:** Shows offline validation status.

**Fix:**
1. Check server internet connectivity
2. Verify firewall allows outbound HTTPS
3. Click **Refresh License** to retry
4. If persists, check server logs
5. Contact hosting provider if connectivity blocked

::: tip
**Remember:** The License page only displays information. All actual changes (renewals, domain updates, addon purchases) happen at [my.uddoktapay.com](https://my.uddoktapay.com). Always click **Refresh License** after making changes there.
:::
