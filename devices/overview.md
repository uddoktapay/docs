---
title: Devices Overview
---

# Devices

Devices are Android phones running the **Payment Automation App**.  
They forward SMS data from your mobile financial services (MFS) accounts (e.g., bKash, Nagad, Rocket) to your server.

## Why devices matter

- Collect SMS data automatically.  
- Keep payment verification seamless.  
- Enable balance and smart verification.  
- Allow you to run multiple wallets across multiple devices.  

Each connected device shows:

- **Device ID & Name**  
- **Model & Android Version**  
- **App Version**  
- **Status** (Connected / Disconnected)  

---

## How devices affect Personal, Agent & Merchant (non-API) gateways

For these gateway types, customers send money directly to the admin and then submit their transaction ID.

- **When a device is connected**  
  The system reads SMS from the SIM and verifies the payment automatically.  

- **When no device is connected**  
  - **Pending Payment disabled** → The customer will see an error:  
    *“Transaction not found, please try again later.”*  
    - If the admin manually adds the SMS details under the **SMS Data** section, the customer can still verify the payment with their transaction ID.  
  - **Pending Payment enabled** → The payment is marked as **Pending**, and the customer is redirected to the Pending page instead of seeing an error.  

::: tip
Always connect at least one device for smooth, automatic payment verification. Pending Payment should only be used as a fallback.
:::
