---
title: Payments
---

# Payments

- [Introduction](#introduction)
- [Payment Actions](#payment-actions)
  - [Pending payments](#pending-payments)
  - [Completed payments](#completed-payments)
- [View Payment Details](#view-payment-details)
- [Edit Payment](#edit-payment)
- [Refund Payment](#refund-payment)
  - [Refund types](#refund-types)
- [Handling unverified transactions](#handling-unverified-transactions)
  - [With Pending Payment enabled](#with-pending-payment-enabled)
  - [With Pending Payment disabled](#with-pending-payment-disabled)

## Introduction

The **Payments** section allows you to view, filter, and manage all transactions in UddoktaPay.  
Payments can be created through **invoices**, **payment links**, or **direct gateway integrations**.

Each payment is associated with **customers**, **gateways**, and **invoices**.  
From the Payments module, you can review details, approve transactions, resend notifications, or issue refunds.

Access the Payments module from the sidebar to view your transaction list with powerful filtering and search capabilities.

## Payment Actions

Available actions depend on the current payment status. Click the **Actions** dropdown for each payment to see available options.

### Pending payments

For payments in **Pending** status:

- **View** — Inspect payment details without making changes
- **Approve** — Confirm and mark the payment as **Completed**
- **Delete** — Permanently remove the payment record

::: warning
Only approve pending payments after verifying the transaction with the gateway or checking SMS Data. Approving unverified payments may result in fraud.
:::

### Completed payments

For payments in **Completed** status:

- **View** — Inspect payment details
- **Refund** — Issue a full or partial refund
- **Send IPN** — Resend the Instant Payment Notification to your external system
- **Delete** — Permanently remove the payment record

::: tip
Use **Refund** instead of **Delete**. Refunds preserve transaction history and reporting accuracy, while deletes erase the record permanently.
:::

## View Payment Details

Click **View** from the Actions menu or click on a payment row to open the payment details page.

## Edit Payment

Click **Edit** from the payment details page to modify payment information.

**Editable fields:**

- **Gateway** — Change the payment gateway
- **Status** — Manually change payment status

::: warning
Changing the status manually bypasses normal verification workflows. Only use this when necessary, such as correcting errors or handling special cases.
:::

## Refund Payment

Click **Refund** from the payment details page to process a refund.

### Refund types

**Manual Refund:**
- You process the refund outside the system
- System updates the payment record only
- Use when refunding through bank transfer or other manual methods

**Refund Through Gateway:**
- System processes refund via the original payment gateway
- Gateway automatically returns funds to customer
- Requires gateway API support for refunds

::: tip
**For partial refunds:** Enter the specific amount you want to refund. The system will calculate the remaining balance.

**For full refunds:** Leave the amount field blank, and the system will refund the entire maximum refundable amount.
:::

::: warning
Refunds through gateway require the original payment gateway to support API refunds. If unsupported, use Manual Refund and process the refund separately.
:::

## Handling unverified transactions

When working with non-API gateways (Personal, Agent, or Merchant accounts), you may encounter situations where a customer submits a TrxID that can't be immediately verified.

### With Pending Payment enabled

- Unverified transactions are automatically changed from **Initiated** to **Pending** status.
- Customer sees a Pending page confirming their submission.
- Admin can review and approve/reject after verification from the Payments list.

### With Pending Payment disabled

- Unverified TrxID results in an error: *"Transaction not found, please try again later."*
- Payment status remains **Initiated** until verification succeeds.
- Once you manually add SMS data, the customer can retry verification with the same TrxID.

::: tip
**Recommendation:** Keep Pending Payment enabled if your SMS-connected devices may occasionally go offline. This provides a better customer experience by allowing payment submission even when automatic verification isn't immediately available.
:::