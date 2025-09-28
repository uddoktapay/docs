---
title: Gateway Configuration
---

# Gateway Configuration

Every gateway has two main sections:

1. **Gateway Information**  
   - Gateway Name (internal)  
   - Display Name (shown to customers)  
   - Currency  
   - Limits (minimum and maximum amount)  
   - Charges (fixed + percentage)  
   - Optional: QR Code for wallet-style gateways  

2. **Configuration (provider-specific)**  
   - API keys, secrets, or credentials (e.g., Client ID, Client Secret)  
   - Mode toggle (Sandbox or Live)  

All fields marked with `*` are required.  
Tooltips explain how to obtain credentials for each provider.

::: warning
Never share your API credentials publicly. Rotate keys immediately if they are exposed.
:::
