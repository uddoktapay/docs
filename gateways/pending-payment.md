---
title: Pending Payment
---

# Pending Payment

Pending Payment lets you control how unverified transactions are handled when customers submit a transaction ID.

---

## How it works

- **If enabled**  
  Payments that cannot be verified automatically will be marked as **Pending**.  
  Customers are redirected to the Pending page instead of seeing an error.  
  You (the admin) can later approve or reject these payments after review.  

- **If disabled**  
  When a transaction ID cannot be verified, the customer sees an error:  
  *“Transaction not found, please try again later.”*  

---

## With Personal, Agent & Merchant (non-API) gateways

For these gateways, customers send money directly to the admin and then submit their transaction ID.

- **When a device is connected**  
  SMS is read automatically and the system verifies the payment.  

- **When no device is connected**  
  - **Pending Payment disabled** → The customer sees an error.  
    - If you manually add the SMS details under the **SMS Data** section, the customer can then verify their payment with the same transaction ID.  
  - **Pending Payment enabled** → The payment is marked as **Pending**, and the customer is redirected to the Pending page instead of seeing an error.  

---

## Best practice

- Keep **Pending Payment enabled** as a fallback if your devices may go offline.  
- If you rely on manual SMS entry, remember that Pending must be enabled or customers will see errors until you update SMS Data.  
- For smoothest experience, always connect at least one active device.
