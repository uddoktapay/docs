---
title: Payment Actions
---

# Payment Actions

Different actions are available depending on the status of the payment.

## Pending Payments

- **View** – Inspect details without making changes.  
- **Approve** – Mark the payment as completed and update all related records.  
- **Delete** – Remove the payment record.  

::: warning
Use **Delete** with caution. This permanently removes the payment record.
:::

## Completed Payments

- **Edit** – Modify payment details if necessary.  
- **Send IPN** – Resend the Instant Payment Notification to your external system.  
- **Refund** – Return funds to the customer (full or partial).  
- **Delete** – Remove the payment record.  

::: tip
Prefer **Refund** over **Delete**. Refunds maintain transaction history and provide accurate reporting.
:::
