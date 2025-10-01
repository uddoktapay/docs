---
title: Payments
---

# Payments

- [Overview](#overview)
- [Payment Actions](#payment-actions)
- [Payment Best Practices](#payment-best-practices)

## Overview

The Payments module allows you to view, filter, and manage all transactions in UddoktaPay.
Payments can be created through invoices, payment links, or direct gateway integrations.

Payments have different statuses, such as:

- **Pending** – A transaction has been created but not yet approved or confirmed.
- **Completed** – The payment has been successfully confirmed.
- **Refunded** – The payment was returned to the customer.
- **Partially Refunded** – A portion of the payment has been refunded.
- **Failed** – The payment attempt did not succeed.
- **Voided** – The payment was canceled before completion.

Payments are tightly connected with **customers**, **gateways**, and **invoices**. From the Payments module, you can drill down into details, approve transactions, or issue refunds.

## Payment Actions

Different actions are available depending on the status of the payment.

### Pending Payments

- **View** – Inspect details without making changes.
- **Approve** – Mark the payment as completed and update all related records.
- **Delete** – Remove the payment record.

::: warning
Use **Delete** with caution. This permanently removes the payment record.
:::

### Completed Payments

- **Edit** – Modify payment details if necessary.
- **Send IPN** – Resend the Instant Payment Notification to your external system.
- **Refund** – Return funds to the customer (full or partial).
- **Delete** – Remove the payment record.

::: tip
Prefer **Refund** over **Delete**. Refunds maintain transaction history and provide accurate reporting.
:::

## Payment Best Practices

The following practices help maintain reliable payment records.

- **Verify before approving**
  Ensure the transaction has cleared with the gateway before marking it as completed.

- **Prefer refund over delete**
  If a payment needs to be reversed, issue a refund. This preserves transaction history and ensures accurate reporting.

- **Use filters and exports**
  Combine filters and column visibility to audit specific gateways, customers, or time ranges.

- **Resend IPNs when necessary**
  If your system did not receive a callback, use the **Send IPN** action to resend the notification.