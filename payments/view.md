---
title: View Payment
---

# View Payment

Selecting a payment opens its detailed view.  

## Pending Payments

A pending payment shows:

- Payment ID, Date, and Status  
- Transaction Details (method, transaction ID)  
- Financial Details (amount, processing fee, net amount, refunded amount)  
- Tabs for Customer information and Metadata  

## Completed Payments

A completed payment shows the same sections as pending, with the addition of:

- Final confirmed status  
- Refund history  
- Net amount after processing fees and any refunds  

::: warning
Approving or refunding a payment will update financial records and may notify external systems through webhooks or IPN.
:::