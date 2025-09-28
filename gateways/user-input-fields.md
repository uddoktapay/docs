---
title: User Input Fields
---

# User Input Fields

User input fields allow you to collect extra information from customers during checkout.  
They are especially useful for **Bank Gateways** where proof of payment is required.

## Available field types

- **Text** — e.g., Transaction ID, Reference Number
- **Email** — to confirm payer’s contact
- **Number** — for mobile or account numbers
- **File Upload** (where supported) — proof of payment screenshot
- **Dropdown / Select** (custom options) — let customers pick a payment branch or method

## Marking as required

Each field can be marked as **required**.  
If required, customers cannot submit the payment form without filling the field.

## Example

For a Bank Transfer gateway, you might configure:

- **Trx ID** (Text, Required)  
- **Proof Screenshot** (File Upload, Optional)  

::: tip
Keep required fields limited to what you need to verify a payment. Extra required fields can reduce completion rates.
:::
