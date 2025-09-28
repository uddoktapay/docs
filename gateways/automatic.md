---
title: Automatic Gateways
---

# Automatic Gateways

Automatic gateways are API-based connections to providers.  
Examples: PayPal, Stripe, Paddle, bKash, Nagad, Ok Wallet, Pathao Pay, and many others.

## Features

- Predefined list of 30+ gateways
- Can be extended with custom modules
- Status toggle to enable/disable
- Standard configuration fields across all gateways
- Some providers support QR code upload (for wallet-based payments)

## Configuration examples

- **PayPal** — Client ID and Client Secret
- **bKash** — App Key and App Secret
- **Stripe** — Publishable Key and Secret Key
- **Agent wallets** — Number and pending payment toggle

Each gateway may have unique fields required by the provider. The form will guide you with labels and tooltips.

::: warning
Always use test credentials in **Sandbox mode** before going live.
:::
