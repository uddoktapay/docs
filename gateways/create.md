---
title: Create Automatic Gateway
---

# Create Automatic Gateway

From **Gateways → New gateway**, select a provider from the list (for example, **bKash API**, **PayPal**, or **EPS**).  
Each automatic gateway has its own configuration fields, but most share a common structure.

## Common fields

- **Display Name** — Name shown to customers at checkout.  
- **Currency** — Currency this gateway processes.  
- **Minimum Amount / Maximum Amount** — Allowed transaction range.  
- **Charges** — Fixed fee and percentage fee applied per transaction.  

::: warning
If the checkout amount is outside the defined **Minimum** or **Maximum**, the gateway will not appear.  
Setting **Maximum = 0** means **no limit**.
:::

## Provider configuration

Depending on the provider, additional fields may include:

- **Sandbox Mode** — toggle between testing and live environments.  
- **Credentials** — for example, Client ID/Secret, Username/Password, App Key/App Secret.  
- **Number** — wallet or agent number (for personal or agent gateways).  
- **Pending Payment** — controls how unmatched transactions are handled.  

## Pending Payment option

For **Personal, Agent, and non-API merchant automation gateways**:

- **Enabled:** If a customer submits a transaction ID that is not found in the SMS Data section, the payment will still be created with status **Pending**. You can later verify it manually.  
- **Disabled:** If the transaction ID is not found in SMS Data, the system immediately shows an error and does not create the payment.  

::: tip
Enable **Pending Payment** when you want flexibility to review unmatched payments manually.  
Disable it when you need strict automation and no manual verification.
:::
