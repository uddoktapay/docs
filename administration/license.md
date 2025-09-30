---
title: License
---

# License

The **License** page shows your license status and controls which domains can access the panel and call its APIs. It also lets you refresh, clear, or re-validate the license.

---

## What you’ll see

### License Status
- **Status** (Active / Expired / Invalid)  
- **Licensed To** (name & email)  
- **Expires** (date)

### Domain Authorization (Panel access)
- **Authorized Domains** — domains allowed to load the dashboard and public routes.  
- One domain is marked **Current Domain** (the host you’re using now).

### API Access Domains
- **Authorized API Domains** — domains allowed to make API calls to this panel.

### Available Addons
- Shows add-ons included with your license.

### License Information
- **License Key**, **License Type**, **Last Validation**.

---

## Refresh license
Click **Refresh License** after **any** change in the client area (domains, renewal, add-ons).  
This pulls the latest info and updates expiry, domains, and add-ons shown here.

## Change panel domain
If you moved your panel to a new domain:
1. Go to **my.uddoktapay.com → Service details**.
2. Click **Reset Panel Domain**, set the new domain.
3. Return here and click **Refresh License**.

::: warning
Until you reset and refresh, the panel may refuse access on the new domain if it’s not authorized.
:::

## Change API domain
If your application will call the panel from a new domain:
1. Update the **Authorized API Domain** in the **client area**.
2. Come back here and **Refresh License**.

## Use a different license key
If you want to attach a new license to this panel:
1. Click **Clear License**.  
2. Use **Validate** and paste the new **License Key**.

## Renewals
After renewing in the client area, click **Refresh License** to update the **Expires** date here.

---

## Domains: examples

**Authorized Domains (panel)**  
```

pay.example.com
pay.another.com Current Domain

```

You can open the **same dashboard** from any authorized domain.

**Authorized API Domains**  
```

example.com

````
Only this host is allowed to make API calls to the panel.

---

## API domain mismatch

If the requesting site isn’t in **Authorized API Domains**, API requests will fail.  
Typical response:

```json
{
  "status": false,
  "message": "Domain not allowed for API access. Requested domain: another.com, Allowed domains: example.com"
}
````

Fix by updating the **Authorized API Domain** in the client area and then **Refresh License** here.
Make sure any `redirect_url` you send also uses an allowed host. Subdomains count as different hosts (`www.example.com` ≠ `example.com`).

---

## Best practices

* **Always refresh** the license here after changes in the client area (domains, renewals, add-ons).
* Keep at least one **Authorized Domain** reachable; it’s your fallback to access the panel.
* Match the **exact host** used by your site/app when setting **Authorized API Domains**.
* Use HTTPS and valid SSL certificates on every authorized domain.
* Set who can manage license settings in your team.

---

## Troubleshooting

* **“Domain not allowed for API access”**
  Update **Authorized API Domains** in the client area to the host you’re calling from; **Refresh License**.

* **Can’t access the panel on a new domain**
  Use the old authorized domain to log in, **Reset Panel Domain** in the client area, then **Refresh License**.

* **Expiry date didn’t change after renewal**
  Click **Refresh License**.

* **License invalid/expired**
  Verify your key in the client area, then **Clear License** and **Validate** again.

* **Last Validation: Offline**
  Ensure the server can reach the licensing service (outbound internet required), then **Refresh License**.