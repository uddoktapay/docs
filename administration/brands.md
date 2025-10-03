---
title: Brands
---

# Brands

- [Introduction](#introduction)
- [Plan Limits & Upgrades](#plan-limits-upgrades)
- [How Brand Resolution Works](#how-brand-resolution-works)
- [Brands & Domains](#brands-domains)
- [Panel Domains](#panel-domains)
- [Brand List](#brand-list)
- [Create Brand](#create-brand)
- [Edit Brand](#edit-brand)
- [Attach Domains](#attach-domains)
- [Examples](#examples)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Introduction

Brands allow you to run multiple storefronts from a single UddoktaPay dashboard. Each brand has independent settings including logos, mail configuration, notifications, themes, API keys, gateways, and more.

Access Brands from **Administration → Brands** to manage your multi-brand setup.

**Key features:**
- Independent brand settings and configurations
- Domain mapping for clean, professional URLs
- Separate API endpoints per brand
- Brand-specific checkout and payment pages
- Isolated customer data and transactions

## Plan Limits & Upgrades

Your license plan determines how many brands and panel domains you can use.

**Basic Plan:**
- 1 panel domain (dashboard access URL)
- 1 brand (single storefront)

**Need more?**
- Upgrade anytime from [my.uddoktapay.com](https://my.uddoktapay.com)
- Add additional brands for multiple storefronts
- Add panel domains for multi-domain dashboard access

::: tip
If your license includes **multiple panel domains**, you can access the **same dashboard** from each of those domains. This is useful for branded admin access or redundancy.
:::

## How Brand Resolution Works

When a request comes in, UddoktaPay determines which brand to use in this order:

**1. URL brand slug (highest priority)**  
If the route includes a brand slug (e.g., `/default/api/checkout`), that brand is used.

**2. Domain match**  
If the hostname matches a domain attached to a brand, that brand is used (no slug needed).

**3. Default brand (fallback)**  
If neither slug nor matching domain is found, the **default brand** is used.

**If no default brand is configured:**  
Requests without slug or matching domain will return **404 Not Found**.

::: tip
Once a brand is resolved, all generated links automatically target that brand. You don't need to manually add the brand slug to URLs.
:::

::: warning
If you remove a brand's only domain and haven't set a default brand, requests without a slug will fail with **404** until you add a domain or configure a default brand.
:::

## Brands & Domains

**Brand domains** are public-facing domains that customers use to access your payment pages.

**Domain configuration:**
- A brand can have **zero, one, or many** domains
- Multiple brands can each have their own domains
- Multiple domains can point to the **same brand**

**With a brand domain:**  
Routes live at the root of that domain:  
`https://brand-domain.tld/api/checkout` (no slug needed)

**Without a brand domain:**  
The brand is available under its slug on your main domain:  
`https://your-domain.tld/{brand_slug}/api/checkout`

::: warning
All brand and panel domains must point to the **same document root** as your panel installation.
:::

## Panel Domains

**Panel domains** are the URLs you use to access the admin dashboard (e.g., `admin.example.com`, `pay.example.com`).

**Key points:**
- All panel domains access the **same dashboard**
- Useful for branded admin URLs or redundancy
- Must point to the **same document root** as panel
- Requires SSL certificate for each domain
- Available based on your license plan

## Brand List

The brands list displays all configured brands with creation dates.

**Table columns:**
- **Name** — Brand name for identification
- **Created at** — When the brand was created (sortable)

**Available actions:**

**Edit**  
Modify brand name, slug, and attached domains.

**Delete**  
Remove brand permanently (only if not default brand).

Use the search bar to find specific brands by name.

::: warning
You cannot delete a brand that is set as the default brand. Change the default brand first, then delete.
:::

## Create Brand

Click **Create Brand** to add a new storefront.

**Name** (required)  
Brand name for internal identification.

- Used in admin dashboard
- Helps distinguish multiple brands
- Not visible to customers (unless used in settings)

**Slug** (required)  
URL-friendly identifier for the brand.

- Used in fallback URLs when no domain attached
- Format: lowercase letters, numbers, hyphens
- Cannot be changed after creation
- Must be unique across all brands

**Examples:**
- Name: "My Store" → Slug: "my-store"
- Name: "International Shop" → Slug: "intl"
- Name: "Default" → Slug: "default"

::: tip
Choose a short, memorable slug. It appears in URLs when the brand has no attached domain: `https://your-domain.tld/{slug}/api/checkout`
:::

## Edit Brand

Click **Edit** from the actions menu to modify a brand.

**Editable fields:**
- **Name** — Update brand name
- **Slug** — Cannot be changed after creation (displayed but read-only)

### Domains Section

The Domains section appears below brand details and lists all domains attached to this brand.

Click **New domain** to attach additional domains to this brand.

## Attach Domains

From the Edit Brand page, click **New domain** to attach a domain to the brand.

**Domain** (required)  
Enter the full domain name.

- Format: `example.com` or `subdomain.example.com`
- Do not include protocol (http:// or https://)
- Do not include paths or trailing slashes

**Examples:**
- `example.com`
- `shop.example.com`
- `payments.mystore.com`

### DNS & Hosting Setup

After adding a domain, configure DNS and hosting:

**1. Point DNS to your server**
- Create A record pointing to server IP
- Or create CNAME pointing to panel domain
- Wait for DNS propagation (up to 48 hours)

**2. Configure web server**
- Point domain to **same document root** as panel
- All domains must share the panel's root directory
- Configure virtual host if needed

**3. Install SSL certificate**
- Obtain SSL for the domain
- Install on your web server
- Ensure HTTPS works for the domain

**4. Test**
- Visit `https://your-domain.tld/api/checkout`
- Should resolve to the attached brand
- No slug should appear in URL

::: warning
All brand domains **must** point to the same document root as your panel. Different document roots will cause routing errors.
:::

## Examples

### Two brands on separate domains

**Setup:**
- **Default** brand → `example.com`
- **New Brand** → `newdomain.com`

**Results:**
- `https://example.com/api/checkout` → Default brand
- `https://newdomain.com/api/checkout` → New Brand
- Clean URLs, no brand slugs visible

### Brand without a domain

**Setup:**
- **Default** brand (no domain attached)

**Results:**
- `https://your-domain.tld/default/api/checkout`
- Uses brand slug in URL path
- Works but less clean than dedicated domain

### Two domains on the same brand

**Setup:**
- **Default** brand → `example.com`, `example.org`

**Results:**
- `https://example.com/api/checkout` → Default brand
- `https://example.org/api/checkout` → Default brand
- Both domains serve identical content

::: tip
To connect **two domains** to the **same brand**, add both domains to that brand and ensure both point to the **same document root**.
:::

### Multiple brands with mixed domain setup

**Setup:**
- **Default** brand → `example.com`
- **Store** brand → `shop.example.com`
- **International** brand → no domain (uses slug)

**Results:**
- `https://example.com/api/checkout` → Default brand
- `https://shop.example.com/api/checkout` → Store brand
- `https://example.com/international/api/checkout` → International brand

## Best Practices

**Domain strategy:**
- Use separate domain per brand for cleaner URLs and better SEO
- Configure SSL for every attached domain
- Test domains before announcing to customers

**Slug selection:**
- Keep slugs short and readable
- Use lowercase and hyphens only
- Choose slugs that won't need changing

**Default brand:**
- Always set a default brand to avoid 404 errors
- Use your primary storefront as default
- Ensures fallback for unmatched requests

**Domain management:**
- Verify all domains point to same document root
- Monitor DNS propagation after changes
- Keep SSL certificates current

**Multi-brand organization:**
- Use descriptive brand names
- Document which domain maps to which brand
- Review brand settings quarterly

**Security:**
- Enable SSL on all domains
- Use different API keys per brand
- Monitor each brand's transaction activity

## Troubleshooting

**Still seeing slug in URLs**

Problem: URLs show `/brand-slug/` instead of root domain.

**Solution:**
- Add domain to brand in Edit Brand → Domains
- Configure DNS to point to server
- Install SSL for the domain
- Wait for DNS propagation
- Clear browser cache

**Domain shows panel login, not brand routes**

Problem: Domain loads admin dashboard instead of brand pages.

**Solution:**
- Verify domain is attached to correct brand
- Confirm domain points to panel's document root
- Check web server virtual host configuration
- Ensure no conflicting routes

**Unexpected brand resolved**

Problem: Wrong brand appears when accessing domain.

**Solution:**
- Check which brand has the domain attached
- Verify domain isn't attached to multiple brands
- Confirm default brand setting if no domain match
- Review brand resolution order

**404 after removing brand domain**

Problem: Brand inaccessible after domain removal.

**Solution:**
- Set a default brand in settings
- Access via brand slug: `/brand-slug/api/checkout`
- Or attach a new domain to the brand

**Can't create new brand**

Problem: "Create Brand" fails or is disabled.

**Solution:**
- Check your plan limits (Administration → License)
- Upgrade plan at [my.uddoktapay.com](https://my.uddoktapay.com)
- Contact support if limit seems incorrect

**DNS not propagating**

Problem: Domain doesn't resolve after DNS changes.

**Solution:**
- Wait 24-48 hours for global DNS propagation
- Check DNS with tools like `dig` or DNS checkers
- Verify A/CNAME records are correct
- Contact domain registrar if issues persist

::: tip
After making DNS or domain changes, clear your browser cache and try in incognito mode to avoid cached redirects.
:::