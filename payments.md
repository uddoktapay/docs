---
title: Payments
---

# Payments

- [Introduction](#introduction)
- [Payment statuses](#payment-statuses)
- [Payment Actions](#payment-actions)
  - [Pending payments](#pending-payments)
  - [Completed payments](#completed-payments)
- [Handling unverified transactions](#handling-unverified-transactions)
  - [With Pending Payment enabled](#with-pending-payment-enabled)
  - [With Pending Payment disabled](#with-pending-payment-disabled)
- [Payment Best Practices](#payment-best-practices)

## Introduction

The **Payments** section allows you to view, filter, and manage all transactions in UddoktaPay.  
Payments can be created through **invoices**, **payment links**, or **direct gateway integrations**.

Each payment is associated with **customers**, **gateways**, and **invoices**.  
From the Payments module, you can review details, approve transactions, resend notifications, or issue refunds.

## Payment statuses

Payments can exist in several statuses:

- **Initiated** – A payment record has just been created but the customer hasn't submitted transaction details yet.  
- **Pending** – The customer has submitted a transaction ID (TrxID) for MFS or manual bank gateways, awaiting verification.   
- **Completed** – The payment was successfully confirmed.  
- **Refunded** – The payment was fully returned to the customer.  
- **Partially Refunded** – A portion of the payment was refunded.  
- **Failed** – The payment attempt did not succeed.  
- **Voided** – The payment was canceled before completion.  

## Payment Actions

Available actions depend on the current status of a payment.

### Pending payments

- **View** – Inspect details without changing them.  
- **Approve** – Confirm and mark the payment as **Completed**.  
- **Delete** – Permanently remove the payment record.  

::: warning
Deleting a payment erases it from history. Only use this if the record was created by mistake or if the transaction was never completed.
:::

### Completed payments

- **Edit** – Update details if necessary.  
- **Send IPN** – Resend the Instant Payment Notification to your external system.  
- **Refund** – Issue a full or partial refund.  
- **Delete** – Permanently remove the payment record.  

::: tip
Use **Refund** instead of **Delete**. Refunds preserve transaction history and reporting accuracy.
:::

## Handling unverified transactions

When working with non-API gateways (Personal, Agent, or Merchant accounts), you may encounter situations where a customer submits a TrxID that can't be immediately verified.

### With Pending Payment enabled

- Unverified transactions are automatically created as **Pending** payments.
- Customer sees a Pending page confirming their submission.
- Admin can review and approve/reject after verification.

### With Pending Payment disabled

- Unverified TrxID results in an error: *"Transaction not found, please try again later."*
- No payment record is created until verification succeeds.
- Once you manually add SMS data, the customer can retry verification with the same TrxID.

::: tip
**Recommendation:** Keep Pending Payment enabled if your SMS-connected devices may occasionally go offline. This provides a better customer experience by allowing payment submission even when automatic verification isn't immediately available.
:::

## Payment Best Practices

Follow these practices to maintain reliable records:

- **Verify before approving**  
  Always confirm with the gateway or check SMS Data before marking Pending payments as Completed.  

- **Configure Pending Payment appropriately**  
  Enable it for non-API gateways if device connectivity isn't guaranteed.

- **Monitor Initiated payments**  
  Review payments stuck in Initiated status to identify potential customer drop-off points.

- **Prefer refunds over deletes**  
  Refunds preserve transaction history, while deletes erase it.  

- **Monitor SMS Data connectivity**  
  Ensure at least one device is connected for automatic verification of non-API payments.

- **Use filters and exports**  
  Combine filters and column visibility to audit payments by gateway, customer, or time range.  

- **Resend IPNs when necessary**  
  If your external system missed a callback, use **Send IPN**.  

- **Audit regularly**  
  Periodically review statuses and logs to ensure accuracy and compliance.  

::: tip
Clear, accurate payment data improves trust with customers and ensures smoother accounting. Regular review of pending payments helps identify potential issues with gateway connectivity or configuration.
:::