---
title: Create Automatic Gateway
---

# Create Automatic Gateway

Select **New gateway** and pick a provider from the list (for example, bKash API or EPS). Each automatic gateway has its own configuration fields.

Common fields:

- **Display Name** — Name shown during checkout.
- **Currency** — Currency handled by this gateway.
- **Minimum / Maximum Amount** — Range allowed in checkout.
- **Charges** — Fixed and percentage fees.

## Configuration

Configuration depends on the provider, for example:

- **Sandbox** mode  
- **Credentials** — Username, Password, App Key, App Secret  
- **Number** — For personal or agent accounts  
- **Pending Payment** — Whether to allow payments that do not match SMS data

### Pending Payment option

For **Personal, Agent, and non-API merchant automation gateways**:

- **Enabled:** If the user submits a transaction ID that is not found in the SMS Data section, the payment will be created with status **Pending**.  
- **Disabled:** The system will alert the user that the transaction ID was not found, and the payment will not be created.

::: tip
Enable **Pending Payment** if you want to allow manual review of unmatched transactions. Disable it for stricter automation.
:::

::: warning
A checkout amount outside **Minimum**/**Maximum** hides the gateway. **Maximum = 0** means **unlimited**.
:::
