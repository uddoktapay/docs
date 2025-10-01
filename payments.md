---
title: Payments
---

# Payments

- [Introduction](#introduction)
- [Payment statuses](#payment-statuses)
- [Payment List View](#payment-list-view)
  - [Status filter tabs](#status-filter-tabs)
  - [Table columns](#table-columns)
  - [Filters](#filters)
  - [Column customization](#column-customization)
- [Payment Actions](#payment-actions)
  - [Pending payments](#pending-payments)
  - [Completed payments](#completed-payments)
- [View Payment Details](#view-payment-details)
  - [Payment Status section](#payment-status-section)
  - [Transaction Details tab](#transaction-details-tab)
  - [Customer tab](#customer-tab)
  - [Metadata tab](#metadata-tab)
- [Edit Payment](#edit-payment)
- [Refund Payment](#refund-payment)
  - [Refund types](#refund-types)
- [Payment verification timeline](#payment-verification-timeline)
  - [Automatic (API) gateways](#automatic-api-gateways)
  - [Personal/Agent/Merchant (non-API) gateways](#personalagentmerchant-non-api-gateways)
- [Payment lifecycle timeline](#payment-lifecycle-timeline)
- [Handling unverified transactions](#handling-unverified-transactions)
  - [With Pending Payment enabled](#with-pending-payment-enabled)
  - [With Pending Payment disabled](#with-pending-payment-disabled)
- [Payment Best Practices](#payment-best-practices)

## Introduction

The **Payments** section allows you to view, filter, and manage all transactions in UddoktaPay.  
Payments can be created through **invoices**, **payment links**, or **direct gateway integrations**.

Each payment is associated with **customers**, **gateways**, and **invoices**.  
From the Payments module, you can review details, approve transactions, resend notifications, or issue refunds.

Access the Payments module from the sidebar to view your transaction list with powerful filtering and search capabilities.

## Payment statuses

Payments can exist in several statuses:

- **Initiated** – A payment record has just been created but the customer hasn't submitted transaction details yet.  
- **Pending** – The customer has submitted a transaction ID (TrxID) for MFS or manual bank gateways, awaiting verification.  
- **Completed** – The payment was successfully confirmed.  
- **Refunded** – The payment was fully returned to the customer.  
- **Partially Refunded** – A portion of the payment was refunded.  
- **Failed** – The payment attempt did not succeed.  
- **Voided** – The payment was canceled before completion.
- **Canceled** – The payment was canceled by admin or system.

## Payment List View

The payments list displays all transactions with comprehensive filtering and search capabilities.

### Status filter tabs

Quick filter tabs appear at the top of the list:

- **All** — View all payments regardless of status
- **Completed** — Successfully processed payments
- **Pending** — Payments awaiting approval
- **Refunded** — Fully refunded payments
- **Partially refunded** — Payments with partial refunds
- **Failed** — Failed payment attempts
- **Voided** — Canceled payments
- **Initiated** — Newly created payments awaiting customer action

Click any tab to instantly filter the payment list by that status.

### Table columns

The default table displays the following columns:

- **Id** — Unique payment identifier
- **Customer** — Customer email or name
- **Gateway** — Payment method used
- **Amount** — Total payment amount with currency
- **Net Amount** — Amount after processing fees
- **Transaction Id** — Transaction reference from payment provider
- **Status** — Current payment status (color-coded badge)
- **Actions** — Available actions dropdown

### Filters

Click the filter icon (with counter badge showing active filters) to access advanced filtering:

**Available filters:**

- **Status** — Filter by payment status (dropdown with all statuses)
- **Gateway** — Filter by specific payment gateway
- **Created From** — Start date filter (dd/mm/yyyy format)
- **Created Until** — End date filter (dd/mm/yyyy format)

**Using filters:**

1. Click the filter icon in the top right
2. Select your desired filter criteria
3. Filters apply automatically
4. Click **Reset** to clear all filters

The filter icon shows a badge with the number of active filters (e.g., "0" when no filters applied).

::: tip
Combine multiple filters to narrow down results. For example, filter by "Pending" status and a specific gateway to review payments awaiting approval for that method.
:::

### Column customization

Click the column icon (three vertical bars) next to the search to customize visible columns.

**Available columns:**

- **Id** ✓ (default: shown)
- **Customer** ✓ (default: shown)
- **Gateway** ✓ (default: shown)
- **Amount** ✓ (default: shown)
- **Net Amount** ✓ (default: shown)
- **Refunded Amount** ☐ (default: hidden)
- **Transaction Id** ✓ (default: shown)
- **Phone Number** ☐ (default: hidden)
- **Date** ☐ (default: hidden)
- **Status** ✓ (default: shown)

**To customize columns:**

1. Click the column customization icon
2. Check/uncheck columns to show/hide
3. Click **Apply columns**
4. Click **Reset** to restore defaults

::: tip
Hide columns you don't frequently need to reduce clutter. For example, hide "Refunded Amount" if you rarely process refunds.
:::

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

### Payment Status section

Displays key payment information at the top:

- **Payment ID** — Unique identifier (e.g., `pUjpW9DUVGZCBUKMegLkMnKdULcvg16FQYNsljAE`)
- **Date** — Payment creation timestamp (e.g., `Sep 29, 2025 10:18:47`)
- **Status** — Current status with color-coded badge

**Action buttons** (top right, vary by status):

- **Edit** (blue) — Modify payment details
- **Approve** (green) — Approve pending payment
- **Send IPN** (green) — Resend webhook notification
- **Refund** (yellow/orange) — Process refund
- **Delete** (red) — Remove payment

### Transaction Details tab

The default view showing payment information organized in sections:

**Payment Information:**
- **Payment Method** — Gateway used (e.g., Bkash Agent)
- **Transaction ID** — Reference from payment provider

**Financial Details:**
- **Amount** — Base payment amount
- **Processing Fee** — Gateway charges (shown in blue)
- **Total amount** — Amount including fees
- **Refunded amount** — Total refunded (shown in red, 0.00 if not refunded)
- **Net Amount** — Final amount received (shown in green, prominently displayed)

The currency badge (e.g., **BDT**) appears next to the Transaction Details tab.

### Customer tab

Click the **Customer** tab to view customer information associated with the payment:
- Customer name
- Email address
- Phone number
- Other customer details

### Metadata tab

Click the **Metadata** tab to view additional information:
- Custom fields submitted during checkout
- User input field data
- System-generated metadata
- Integration-specific data

::: tip
Check the Metadata tab when troubleshooting payment issues to see all data submitted by the customer.
:::

## Edit Payment

Click **Edit** from the payment details page to modify payment information.

**Editable fields:**

- **Gateway** — Change the payment gateway (dropdown)
- **Status** — Manually change payment status (dropdown with options: Pending, Failed, Canceled, Voided, Completed, Refunded, Partially Refunded)

**Status options in Edit Payment:**
- Pending
- Failed
- Canceled
- Voided
- Completed
- Refunded
- Partially Refunded

**Actions:**
- **Save changes** — Apply modifications
- **Cancel** — Return without saving

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

**Refund form fields:**

| Field | Description | Required |
|-------|-------------|----------|
| **Amount** | Refund amount (leave blank for full refund) | No |
| **Refund Reason** | Explanation for the refund | Yes |
| **Refund Type** | Manual Refund or Refund Through Gateway | Yes |
| **Transaction ID** | Reference ID for the refund (appears when Manual Refund selected) | Conditional |

::: tip
**For partial refunds:** Enter the specific amount you want to refund. The system will calculate the remaining balance.

**For full refunds:** Leave the amount field blank, and the system will refund the entire maximum refundable amount.
:::

::: warning
Refunds through gateway require the original payment gateway to support API refunds. If unsupported, use Manual Refund and process the refund separately.
:::

## Payment verification timeline

What happens from the moment a customer selects a gateway to when a payment is completed—covering both API and non-API flows.

### Automatic (API) gateways

1. Customer selects gateway → submits payment.
2. System sends API request to provider.
3. Provider returns **success/pending/failed**.
4. Final status:
   - **Success:** Payment marked **Completed**.
   - **Pending:** Payment marked **Pending** and updated when the provider sends webhook/IPN.
   - **Failed:** Error shown; payment not created (or created as **Failed**, depending on provider behavior).

### Personal/Agent/Merchant (non-API) gateways

1. Payment record created with status **Initiated**.
2. Customer sends money → receives a transaction ID (TrxID).
3. Customer submits TrxID in checkout.
4. System attempts to match via **SMS Data**:
   - **Device connected & SMS received:** Auto-match → **Completed**.
   - **Device offline or SMS missing:**
     - **Pending Payment enabled:** Status changes to **Pending**; customer sees Pending page.
     - **Pending Payment disabled:** Show "Transaction not found" error; status remains **Initiated**.
5. Admin may later:
   - Add the SMS manually to **SMS Data** and **Verify**.
   - Approve/Reject a **Pending** payment.

::: tip
If your device connectivity is not guaranteed, keep **Pending Payment** enabled in gateway settings so customers aren't blocked during temporary SMS delays.
:::

## Payment lifecycle timeline

The typical flow of a payment from start to finish:

1. **Initiated** → A payment record is created via invoice, link, or gateway. Status: **Initiated** (waiting for customer action).  
2. **Customer Action** → For non-API gateways, customer sends money and submits TrxID. Status may change to **Pending**.  
3. **Verification** → The system attempts automatic confirmation:
   - **API gateways:** Provider responds with success/pending/failed status.
   - **Non-API gateways:** System checks SMS Data for matching transaction.
   - Success → moves to **Completed**.  
   - Failure → marked as **Failed**.  
   - Unmatched → changes to **Pending** (if enabled) until manually approved or SMS data becomes available.  
4. **Completion** → Once confirmed, the status becomes **Completed** and linked records update.  
5. **Adjustment** (optional) → Admin may issue a **Refund** (full or partial) or mark as **Voided**.  
6. **Final record** → The payment remains stored for history, reporting, and auditing.  

::: tip
Payments should generally move forward in this timeline.  
Use **Refund** or **Void** instead of deleting, so history stays accurate.
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

## Payment Best Practices

Follow these practices to maintain reliable records:

- **Verify before approving**  
  Always confirm with the gateway or check SMS Data before marking Pending payments as Completed.  

- **Configure Pending Payment appropriately**  
  Enable it for non-API gateways if device connectivity isn't guaranteed.

- **Monitor Initiated payments**  
  Review payments stuck in Initiated status to identify potential customer drop-off points.

- **Prefer refunds over deletes**  
  Refunds preserve transaction history, while deletes erase it permanently.  

- **Monitor SMS Data connectivity**  
  Ensure at least one device is connected for automatic verification of non-API payments.

- **Use status filters effectively**  
  Combine status tabs with date filters to audit specific time periods.

- **Customize columns for your workflow**  
  Show only the columns you need regularly to reduce visual clutter.

- **Document refund reasons**  
  Always provide clear refund reasons for audit trails and customer communication.

- **Use gateway refunds when available**  
  Automatic gateway refunds are faster and more convenient than manual processing.

- **Resend IPNs when necessary**  
  If your external system missed a callback, use **Send IPN** to retrigger the webhook.  

- **Audit regularly**  
  Periodically review payments by status and gateway to ensure accuracy and compliance.  

- **Review Net Amount carefully**  
  Always check the Net Amount (after processing fees) when reconciling accounts.

::: tip
Clear, accurate payment data improves trust with customers and ensures smoother accounting. Regular review of pending payments helps identify potential issues with gateway connectivity or configuration.
:::

::: warning
Never delete completed payments unless absolutely necessary. Deletions remove the record from all reports and audit trails, which may cause compliance issues.
:::