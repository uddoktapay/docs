---
title: Gateways
---

# Gateways

- [Introduction](#introduction)
  - [Types of gateways](#types-of-gateways)
- [Payment verification timeline](#payment-verification-timeline)
- [Reorder gateways](#reorder-gateways)
- [Create automatic gateway](#create-automatic-gateway)
  - [Common fields](#common-fields)
  - [Provider configuration](#provider-configuration)
- [Create bank gateway](#create-bank-gateway)
    - [User input fields](#user-input-fields)
        - [Available field types](#available-field-types)
- [Pending Payment](#pending-payment)
    - [How it Works](#how-it-works)
- [Gateway best practices](#gateway-best-practices)

## Introduction

Gateways let you accept payments via APIs (automatic) or offline/manual channels (bank). Configure which methods appear at checkout, their order, limits, and fees.

## Types of gateways

1. **Automatic gateways** — API-based integrations with providers like PayPal, Stripe, bKash, Nagad, EPS, etc.  
2. **Bank gateways** — manual transfer methods with predefined bank fields and proof collection.

::: tip
For developers: follow the [Gateway Developer](#developer-guide) docs to build a custom gateway.
:::


## Payment verification timeline

What happens from the moment a customer selects a gateway to when a payment is completed—covering both API and non-API flows.

**A. Automatic (API) gateways**
1. Customer selects gateway → submits payment.
2. System sends API request to provider.
3. Provider returns **success/pending/failed**.
4. - **Success:** Payment marked **Completed**.
   - **Pending:** Payment marked **Pending** and updated when the provider sends webhook/IPN.
   - **Failed:** Error shown; payment not created (or created as **Failed**, depending on provider behavior).

**B. Personal/Agent/Merchant (non-API) automation**
1. Customer sends money → receives a transaction ID (TrxID).
2. Customer submits TrxID in checkout.
3. System attempts to match via **SMS Data**:
   - **Device connected & SMS received:** Auto-match → **Completed**.
   - **Device offline or SMS missing:**
     - **Pending Payment enabled:** Create **Pending** payment; customer sees Pending page.
     - **Pending Payment disabled:** Show “Transaction not found” error; no payment created.
4. Admin may later:
   - Add the SMS manually to **SMS Data** and **Verify**.
   - Approve/Reject a **Pending** payment.

::: tip
If your device connectivity is not guaranteed, keep **Pending Payment** enabled so customers aren’t blocked during temporary SMS delays.
:::


## Reorder gateways

Click the **Reorder** icon to open the drag-and-drop view. Arrange gateways in the desired order and **Save**.  
This order controls how gateways are suggested during checkout.

::: tip
Keep the most frequently used or highest-conversion methods at the top.
:::

## Create automatic gateway

From **Gateways → New gateway**, select a provider (e.g., **bKash API**, **PayPal**, **EPS**, etc.).  
Each automatic gateway has its own configuration, but most share a common structure.

### Common fields

| Field | Description |
| --- | --- |
| **Display Name** | Shown to customers at checkout. Use a clear, recognizable label (e.g., “bKash Personal”). |
| **Currency** | Currency this gateway processes. Must match your provider account. |
| **Minimum Amount / Maximum Amount** | Allowed transaction range. **Max = 0** means **no limit**. |
| **Charges** | Fixed fee and percentage fee applied per transaction. |

::: warning
If the checkout amount is outside the defined **Minimum** or **Maximum**, the gateway will not appear.
:::

### Provider configuration

May include:

- **Sandbox Mode** — toggle between testing and live environments.  
- **Credentials** — e.g., Client ID/Secret, Username/Password, App Key/App Secret.  

## Create bank gateway

Bank Gateways are used for offline transfers. They collect user proof and are approved from the Payments module.

**Steps:**

1. Click **New bank gateway**.  
2. Fill **Gateway Information**:
   - **Gateway Name** and **Display Name**
   - **Currency**
   - **Minimum / Maximum Amount**
   - **Fixed / Percentage Charges**
3. Upload a **Logo** and optional **Description**.  
4. Fill **Bank Information** (Bank Name, Account Holder, Account Number, Branch, Routing, SWIFT/BIC).  
5. Configure **User Input Fields** (e.g., TrxID, slip upload).  
6. **Save**.

::: tip
Need similar variations? Use **Replicate** on the list page to duplicate a bank gateway.
:::


### User Input Fields

User input fields allow you to collect extra information from customers during checkout.  
They are especially useful for **Bank Gateways** where proof of payment is required.

#### Available field types

- **Text** — e.g., Transaction ID, Reference Number
- **Email** — to confirm payer’s contact
- **Number** — for mobile or account numbers
- **File Upload** (where supported) — proof of payment screenshot
- **Dropdown / Select** (custom options) — let customers pick a payment branch or method

::: tip
Keep required fields limited to what you need to verify a payment. Extra required fields can reduce completion rates.
:::


## Pending Payment

Pending Payment governs what happens when a customer submits a TrxID that can’t be verified automatically.

### How it works

- **Enabled**  
  - Unverified payments are marked **Pending** and the customer sees a Pending page.  
  - Admin can approve/reject after review.

- **Disabled**  
  - Unverified TrxID results in an error:  
    *“Transaction not found, please try again later.”*  

### With Personal, Agent & Merchant (non-API) gateways

- **Device connected** → SMS auto-read → match → **Completed**.  
- **Device not connected**:
  - **Pending disabled** → Error shown.  
    - If you later add SMS data manually, the customer can then verify the same TrxID.  
  - **Pending enabled** → Payment created as **Pending** (no error).

::: tip
- Keep **Pending Payment enabled** as a fallback if devices may go offline.  
- If you rely on manual SMS entry, **Pending** should be enabled or customers will see errors until you update SMS Data.  
- For the smoothest experience, connect at least one active device.
:::

## Gateway best practices

- **Enable only what you use** — disable unused gateways.  
- **Sandbox first** — validate flows before going live.  
- **Name clearly** — e.g., “bKash Personal” (not “Bkash_01”).  
- **Set proper limits** — ensure min/max reflect your real policy.  
- **Verify fees** — fixed + % must match your provider agreement.  
- **Bank gateways** — request proof fields (TrxID, slip).  
- **Monitor status** — toggle off during provider downtime.  
- **Review monthly** — credentials, charges, visibility, and order.

::: tip
Revisit your gateway list monthly to confirm charges, credentials, and active status are correct.
:::
