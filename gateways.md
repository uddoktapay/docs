---
title: Gateways
---

# Gateways

- [Introduction](#introduction)
  - [Types of gateways](#types-of-gateways)
- [Gateway List View](#gateway-list-view)
  - [Automatic Gateways](#automatic-gateways)
  - [Bank Gateways](#bank-gateways)
- [Reorder Gateways](#reorder-gateways)
- [Create Automatic Gateway](#create-automatic-gateway)
  - [Available gateway providers](#available-gateway-providers)
  - [Gateway Information](#gateway-information)
  - [Configuration](#configuration)
- [Create Bank Gateway](#create-bank-gateway)
  - [Gateway Information](#gateway-information-1)
  - [Gateway Logo](#gateway-logo)
  - [Gateway Description](#gateway-description)
  - [Bank Information](#bank-information)
  - [User Input Fields](#user-input-fields)
- [Edit Gateway](#edit-gateway)
  - [Available actions](#available-actions)
- [User Input Fields](#user-input-fields-1)
  - [Available field types](#available-field-types)
  - [Field configuration](#field-configuration)
- [Pending Payment](#pending-payment)
  - [How it works](#how-it-works)
- [Custom Gateway Development](#custom-gateway-development)
- [Gateway Best Practices](#gateway-best-practices)

## Introduction

Gateways let you accept payments via APIs (automatic) or offline/manual channels (bank). Configure which methods appear at checkout, their order, limits, and fees.

Access the Gateways module from the sidebar to view and manage your payment gateways. The interface is organized into two main categories: **Automatic** gateways and **Bank Gateways**.

### Types of gateways

1. **Automatic gateways** — API-based integrations with providers like Payeer, PayPal, bKash, Nagad, etc.  
2. **Bank gateways** — Manual transfer methods with predefined bank fields and proof collection.

::: tip
For developers: Follow the Gateway Developer docs to build custom gateway integrations.
:::

## Gateway List View

The gateway list displays all configured payment methods organized by type. Each gateway shows:

- **Display name** — Name shown to customers at checkout
- **Currency** — Supported currency (USD, BDT, etc.)
- **Status** — Inline toggle to enable/disable the gateway

### Automatic Gateways

View and manage API-based gateways by clicking **Automatic** in the sidebar navigation under Gateways. This section lists all automatic payment providers.

### Bank Gateways

Access manual bank transfer gateways by clicking **Bank Gateways** in the sidebar navigation. This section displays bank gateways configured for offline payments.

**Available actions for all gateways:**

- **Edit** — Modify gateway configuration and settings
- **Replicate** — Duplicate a bank gateway to create a similar one (Bank Gateways only)
- **Delete** — Remove the gateway permanently
- **Status Toggle** — Enable/disable the gateway without deleting

::: tip
Use the **Search** bar at the top right to quickly find specific gateways. The reorder icon (↕) lets you drag and drop gateways to change their display order at checkout.
:::


## Reorder Gateways

Control the order gateways appear to customers during checkout. The order you set determines which payment methods customers see first.

**To reorder gateways:**

1. Click the **Reorder** icon (↕) at the top of the gateway list
2. A drag-and-drop interface opens showing all gateways
3. Click and hold the drag handle on any gateway
4. Drag the gateway up or down to the desired position
5. Release to drop in the new position
6. Click **Save** to apply the new order

The order saves immediately and affects all checkout pages, payment links, and invoices.

**Display order strategy:**

- **Top positions** — Most frequently used payment methods
- **Middle positions** — Alternative payment options
- **Bottom positions** — Rarely used or backup methods

**Examples:**

**High-volume business:**
1. bKash Personal (most customers use)
2. Nagad Personal
3. Bank Transfer
4. PayPal (international)

**International focus:**
1. PayPal
2. Stripe
3. Local bank transfer
4. bKash (for local customers)

::: tip
Place your highest-conversion payment methods at the top. Customers are more likely to choose options they see first. Review and adjust order based on actual usage patterns.
:::

::: warning
Reordering only affects the display sequence at checkout. It does not change gateway settings, limits, or fees. All enabled gateways remain available regardless of position.
:::

## Create Automatic Gateway

To add a new automatic gateway, click **New gateway** from the Automatic Gateways list.

### Available gateway providers

A modal will appear with a searchable dropdown showing available providers grouped by currency.

::: tip
Use the search box in the gateway selector to quickly find your desired provider. Gateways are automatically filtered based on your business requirements.
:::

### Gateway Information

Once you select a provider, you'll see the Edit Gateway form with two main sections.

**Basic gateway configuration and settings:**

| Field | Description | Required |
|-------|-------------|----------|
| **Gateway Name** | Internal name of the gateway provider (auto-filled, usually not editable) | Yes |
| **Display Name** | Name shown to customers during checkout | Yes |
| **Minimum Amount** | Minimum transaction amount allowed | Yes |
| **Maximum Amount** | Maximum transaction amount allowed (0 = no limit) | Yes |
| **Fixed Charge** | Fixed fee charged per transaction | Yes |
| **Percentage Charge** | Percentage fee charged per transaction | Yes |
| **QR Code** | Upload a QR code image for this gateway (optional) | No |

**Additional fields (varies by gateway type):**

For non-API gateways (Personal, Agent, Merchant):
- **Number** — The mobile number or account identifier for receiving payments
- **Pending Payment** — Dropdown to enable/disable pending payment feature

::: warning
If the checkout amount is outside the defined **Minimum** or **Maximum**, the gateway will not appear as an option for customers.
:::

### Configuration

Gateway-specific configuration parameters vary by provider.

**For API gateways (like Payeer):**
- **Success url** — Redirect URL after successful payment
- **Fail url** — Redirect URL after failed payment
- **Status url** — Webhook/IPN URL for payment status updates
- **Merchant id** — Your merchant identifier from the provider
- **Secret key** — API secret key for authentication
- **Additional encryption key** — Extra security key (if required by provider)

**For non-API gateways (Personal/Agent/Merchant):**
- **Number** — The account number that receives payments
- **Pending Payment** — Enable or Disable pending payment handling

::: tip
Always keep your API credentials secure. Never share Secret keys or Merchant IDs publicly.
:::

## Create Bank Gateway

To add a manual bank transfer gateway, click **New bank gateway** from the Bank Gateways list.

### Gateway Information

**Basic gateway configuration and settings:**

| Field | Description | Required |
|-------|-------------|----------|
| **Gateway Name** | Internal identifier for the bank gateway | Yes |
| **Currency** | Currency for this gateway (e.g., BDT, USD) | Yes |
| **Minimum Amount** | Minimum transaction amount allowed | Yes |
| **Maximum Amount** | Maximum transaction amount allowed (0 = no limit) | Yes |
| **Fixed Charge** | Fixed fee charged per transaction | Yes |
| **Percentage Charge** | Percentage fee charged per transaction | Yes |

### Gateway Logo

**Upload a logo to represent this payment gateway**

- Drag & Drop your files or click **Browse**
- Logo size should be in JPG, JPEG or PNG (500 × 200 pixels) format
- This logo appears on the checkout page for customer recognition

### Gateway Description

**Provide additional information about this payment method**

| Field | Description |
|-------|-------------|
| **Description** | Detailed description of the gateway for administrative reference (max 5000 characters) |

### Bank Information

**Bank account details for manual transfer processing:**

| Field | Description | Required |
|-------|-------------|----------|
| **Bank Name** | Full name of the bank or financial institution | Yes |
| **Account Holder Name** | Name of the account holder as registered with the bank | Yes |
| **Account Number** | Bank account number for receiving payments | Yes |
| **Branch Name** | Name or address of the bank branch | Yes |
| **Routing Number** | Bank routing number (ABA number for US banks, optional) | No |
| **SWIFT/BIC Code** | International bank identifier code (required for international transfers) | No |

::: tip
Fill in all bank details carefully. Customers will see this information when making manual transfers.
:::

### User Input Fields

**Configure additional fields that users need to fill during payment**

This section allows you to collect proof of payment and other necessary information from customers. See [User Input Fields](#user-input-fields-1) below for detailed configuration.

::: tip
Use **Replicate** on existing bank gateways to quickly create similar configurations with different bank details.
:::

## Edit Gateway

Click the **Edit** action on any gateway to modify its configuration. The edit form contains the same sections as the create form.

### Available actions

From the gateway list:

- **Edit** — Open the gateway configuration form
- **Replicate** (Bank Gateways only) — Duplicate the gateway with all settings
- **Delete** — Remove the gateway permanently
- **Status Toggle** — Enable/disable without opening the edit form

::: warning
Deleting a gateway does not affect completed payments made through it. However, the gateway will no longer be available for new transactions.
:::

## User Input Fields

User input fields allow you to collect extra information from customers during checkout. They are especially useful for **Bank Gateways** where proof of payment is required.

### Available field types

The following input types are available:

- **Text** — Single-line text input (e.g., Transaction ID, Reference Number)
- **Textarea** — Multi-line text area (e.g., payment notes, instructions)
- **Select** — Dropdown with predefined options (e.g., payment branch, transfer type)
- **Radio** — Single choice from multiple options (e.g., account type)
- **Checkbox** — Multiple selections allowed (e.g., confirmation checkboxes)
- **File** — File upload for proof of payment (e.g., screenshot, receipt)

::: tip
For bank gateways, always include at least one **Text** field for Transaction ID and one **File** field for payment proof upload.
:::

### Field configuration

For each field you add, configure:

- **Form Type** — Select from available input types (required, red asterisk)
- **Field Name** — Label displayed to customers (required, red asterisk)
- **Is Required** — Toggle to make the field mandatory

**Managing fields:**

- **Reorder** — Use the drag handles (↕ ↑ ↓) to arrange field order
- **Delete** — Click the red trash icon to remove a field
- **Add** — Click **Add new field** at the bottom to add more fields

::: tip
Keep required fields limited to what you need to verify a payment. Extra required fields can reduce completion rates.
:::

**Example configuration for a bank gateway:**

| Form Type | Field Name | Is Required |
|-----------|------------|-------------|
| Text | Transaction ID | Yes |
| File | Payment Screenshot | Yes |
| Textarea | Additional Notes | No |
| Select | Payment Branch | No |


## Pending Payment

The Pending Payment setting governs what happens when a customer submits a TrxID that can't be verified automatically.

### How it works

Configure this setting in the gateway's **Configuration** section:

- **Enable**  
  - Unverified payments are marked **Pending** and the customer sees a Pending page.  
  - Admin can approve/reject after review from the Payments module.

- **Disable**  
  - Unverified TrxID results in an error: *"Transaction not found, please try again later."*  
  - Payment remains in **Initiated** status until verification succeeds.

### With Personal, Agent & Merchant (non-API) gateways

- **Device connected** → SMS auto-read → match → **Completed**.  
- **Device not connected**:
  - **Pending disabled** → Error shown.  
    - If you later add SMS data manually, the customer can then verify the same TrxID.  
  - **Pending enabled** → Payment created as **Pending** (no error).

::: tip
- Keep **Pending Payment enabled** as a fallback if devices may go offline.  
- If you rely on manual SMS entry, **Pending** should be enabled or customers will see errors until you update SMS Data.  
- For the smoothest experience, connect at least one active device to SMS Data.
:::


## Custom Gateway Development

Need a payment gateway not currently supported? UddoktaPay allows developers to create custom gateway integrations.

::: tip
**For Developers:**  
Build custom gateway drivers for any payment provider with an API. Custom gateways integrate seamlessly with the existing payment flow and appear alongside built-in gateways.

See the [Developer Guide](/developers/gateway) for implementation details, including:
- Creating custom gateway drivers
- Implementing checkout methods
- Handling payment verification
- Processing refunds and callbacks
- Registering custom gateways
- Testing and debugging

**Common use cases:**
- Local payment providers not yet integrated
- Regional mobile money services
- Bank-specific payment APIs
- Custom payment processors
- Internal payment systems
:::

## Gateway Best Practices

Follow these practices for reliable gateway management:

- **Enable only what you use** — Disable unused gateways to avoid customer confusion.  

- **Test thoroughly** — For API gateways, use sandbox mode first to validate the integration.  

- **Name clearly** — Use descriptive display names like "bKash Personal" instead of generic names like "Gateway 1".  

- **Set proper limits** — Ensure minimum/maximum amounts reflect your actual business policies.  

- **Verify fees** — Fixed + percentage charges must match your provider agreement to avoid losses.  

- **Bank gateways require proof** — Always configure Transaction ID and file upload fields for verification.  

- **Configure Pending Payment** — Enable it for non-API gateways if SMS Data connectivity isn't guaranteed.

- **Monitor gateway status** — Use the toggle to disable gateways during provider downtime or maintenance.  

- **Organize by priority** — Use the reorder function to place most-used gateways at the top.

- **Secure credentials** — Never share API keys, merchant IDs, or secret keys publicly.

- **Review regularly** — Check credentials, charges, and settings monthly to ensure accuracy.  

- **Use Replicate wisely** — For bank gateways with similar configurations, use Replicate instead of creating from scratch.

::: tip
Revisit your gateway configuration monthly to confirm charges, credentials, active status, and customer-facing names are correct.
:::