---
title: General Settings
---

# General Settings

- [Introduction](#introduction)
- [Homepage Redirect](#homepage-redirect)
- [Admin Path](#admin-path)

## Introduction

General Settings configure fundamental system-wide preferences including homepage behavior and admin panel access path.

Access General Settings from **Administration → System Settings → General**.

::: warning
These settings affect all brands and the entire installation. Changes apply globally.
:::

## Homepage Redirect

Configure where visitors are redirected when accessing the base domain.

**Homepage Redirect**  
URL or path for base domain redirection.

- Prefix: `https://`
- Placeholder: `example.com or example.com/custom-page`
- Accepts full domain or path

**Where it applies:**  
When someone visits your base domain (e.g., `https://yourdomain.com`), they redirect to this URL.

**Examples:**
- `example.com` — Redirect to another domain
- `example.com/welcome` — Redirect to specific page
- `example.com/brand/checkout` — Redirect to brand checkout

::: tip
Use a valid domain or path. This helps when you want your base domain to redirect to a specific landing page, brand, or external site.
:::

## Admin Path

Customize the URL path for accessing the admin panel.

**Admin Path**  
Custom URL segment for admin access.

- Prefix: `https://selfhosted.test/`
- Placeholder: `admin`
- Lowercase letters, numbers, and dashes only

**Format requirements:**
- Lowercase only
- No spaces
- Use dashes for separation
- Examples: `admin`, `console`, `back-office`

**Default:** `admin`

**Access URL:**  
`https://yourdomain.com/{admin-path}`

**Examples:**
- `admin` → `https://yourdomain.com/admin`
- `console` → `https://yourdomain.com/console`
- `back-office` → `https://yourdomain.com/back-office`

::: warning
Changing the admin path immediately updates the admin panel URL. Bookmark the new URL or you may lose access. The old path will no longer work.
:::

## Saving Changes

After configuring settings:

1. Review both Homepage Redirect and Admin Path
2. Click **Save changes**
3. Changes apply immediately

**After changing Admin Path:**
- Update any bookmarks
- Notify your team of the new URL
- Test access at the new path

::: tip
**Security:** Changing the admin path from the default `admin` to a custom value adds a layer of obscurity, making it harder for automated attacks to find your login page.
:::