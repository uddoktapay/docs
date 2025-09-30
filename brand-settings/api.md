---
title: API Settings
---

# API Settings

API Settings allow you to create and manage API keys for your brand. These keys are used to connect external systems with UddoktaPay securely.

---

## Overview

With API Settings, you can:

- Create and name API keys for your brand.  
- Select which **abilities** (permissions) a key will have.  
- Set an **expiry date** for automatic deactivation.  
- Toggle keys on or off without deleting them.  
- Copy and store the API key securely.

::: warning
For security, an API key is shown **only once** upon creation. If it’s lost, you must delete and create a new one.
:::

---

## Creating a New API Key

1. Go to **Brand Settings → API Settings**.  
2. Click **New API Key**.  
3. Fill out the form:
   - **Name**: A label to identify the key (e.g. *Main*, *Production*, *Staging*).  
   - **Abilities**: Select which permissions this key should have.  
     - `payment:checkout` — process a payment.  
     - `payment:verify` — check the status of a payment.  
     - `payment:refund` — refund a payment.  
   - **Expires at**: Optional date when the key will expire.  
   - **Is active**: Toggle to enable/disable immediately.  
4. Click **Create**.  
5. Copy the key from the confirmation modal and store it securely.  

---

## Managing API Keys

After creation, all keys are listed on the **API Keys** page.

- **Active toggle**: Quickly enable/disable a key.  
- **Edit**: Update the key’s name, abilities, or expiry date.  
- **Delete**: Permanently remove the key (cannot be undone).  

::: tip
It’s best practice to create separate keys for staging and production environments, and to restrict each key to the minimal abilities required.
:::

---

## Best Practices

- Keep keys in a **secure vault** or environment variable manager.  
- Do not share keys in public or commit them to version control.  
- Use different keys for different applications or environments.  
- Rotate keys periodically and when team members change.  
- Disable or delete unused keys to reduce risk.  

---

## Troubleshooting

- **Key not working?**  
  Check if it’s active and not expired.  

- **Permission error?**  
  Make sure the key has the correct ability enabled.  

- **Lost a key?**  
  Delete it and create a new one.  

::: tip
API keys are brand-specific. If you switch brands in the dashboard, you’ll see a different set of keys.
:::
