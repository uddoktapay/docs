---
title: SMS Data
---

# SMS Data

- [Introduction](#introduction)
- [How it works](#how-it-works)
- [Connect Android App](#connect-android-app)
- [Create SMS Data](#create-sms-data)
  - [Entry types](#entry-types)
- [Automatic Entry](#automatic-entry)
  - [How to create automatic entry](#how-to-create-automatic-entry)
  - [Supported payment methods](#supported-payment-methods)
- [Manual Entry](#manual-entry)
  - [When to use manual entry](#when-to-use-manual-entry)
- [Edit SMS Data](#edit-sms-data)
- [SMS Data Statuses](#sms-data-statuses)
- [SMS Data Best Practices](#sms-data-best-practices)

## Introduction

SMS Data holds the transaction messages received from your connected Android devices. These records are used to automatically verify user-submitted transaction IDs during checkout for non-API gateways (Personal, Agent, and Merchant accounts).

Access SMS Data from the sidebar under **MFS Automation** to view, create, and manage transaction records.

## How it works

1. The **Paymently Android App** running on a device forwards SMS transaction messages to your server.
2. Each SMS is stored as an **SMS Data record** with parsed transaction details.
3. When a customer submits a transaction ID during checkout, the system searches SMS Data for a matching record.
4. If a match is found and the SMS Data status is **Approved**, the payment is automatically marked as **Completed**.
5. If no match is found or the device is offline, the payment follows the Pending Payment workflow.

**Manual creation option:**
- Admins can create SMS Data manually if the app fails to send a message or the device is offline.
- Automatic creation works for **parsable** messages from supported providers.
- If a message can't be parsed, create it manually via **Manual Entry**.

## Create SMS Data

Click **New SMS Data** to manually create a transaction record. You'll see a form with two entry type options.

### Entry types

Two entry types are available:

1. **Automatic Entry** — Paste the full SMS message and let the system parse transaction details
2. **Manual Entry** — Enter transaction details manually field by field

## Automatic Entry

Automatic Entry parses the full SMS message from supported payment providers to extract transaction details automatically.

### How to create automatic entry

1. Go to **SMS Data → New SMS Data**
2. **Device** (optional) — Select the device that received the SMS
3. **Entry Type** — Select **Automatic Entry** (default)
4. **Payment Method** (required) — Select the provider:
   - bKash
   - Rocket
   - Nagad
   - Upay
   - Cellfin
   - Tap
   - Ok Wallet
   - Ipay
   - Pathao Pay
5. **Message (Copy & Paste from SMS)** (required) — Paste the complete SMS text exactly as received

### Supported payment methods

The system can automatically parse SMS messages from:
- **bKash** — All account types (Personal, Agent, Merchant)
- **Rocket** — All account types
- **Nagad** — All account types
- **Upay** — Mobile financial service
- **Cellfin** — Mobile financial service
- **Tap** — Digital wallet
- **Ok Wallet** — Mobile wallet
- **Ipay** — Payment service
- **Pathao Pay** — Ride-sharing payment service

::: warning
If parsing fails (message format not recognized or incomplete), no automatic entry is created. The system will show an error. In that case, use **Manual Entry** instead.
:::

::: tip
Always paste the **complete SMS message** exactly as received. Don't edit or format the text, as the parser relies on specific patterns to extract data.
:::

## Manual Entry

Manual Entry allows you to input transaction details manually when automatic parsing isn't possible or when creating records from sources other than SMS.

### When to use manual entry

Use Manual Entry when:
- The Android device running Paymently was offline
- The SMS was not forwarded automatically
- Automatic parsing failed due to unrecognized message format
- You're creating historical records
- The SMS format is not supported

::: tip
Use Manual Entry as a fallback when SMS messages can't be automatically parsed. If you have the SMS text, always try **Automatic Entry** first for accuracy.
:::

## Edit SMS Data

Click **Edit** from the actions menu to modify an existing SMS Data record.

::: warning
Editing an SMS Data record that's already **Used** (matched to a payment) won't affect the completed payment. Exercise caution when editing Used records.
:::

## SMS Data Statuses

SMS Data records progress through different statuses:

### Approved
- SMS Data is verified and ready for payment verification
- Will automatically match incoming payment submissions
- Most SMS Data should be in this status for smooth operations

### Awaiting Review
- Newly created SMS Data pending admin verification
- Won't match payments until approved
- Requires manual approval by clicking the **Approve** button

### Used
- SMS Data has been successfully matched to a payment
- Can't be used for verification again
- Kept for record-keeping and audit purposes

### Trashed
- Deleted or invalid SMS Data
- Excluded from payment verification
- Can be permanently deleted or restored if needed

::: tip
Regularly review **Awaiting Review** records and approve legitimate transactions. Pending approvals can block automatic payment verification.
:::

## SMS Data Best Practices

Follow these practices for reliable SMS Data management:

- **Keep devices connected**  
  Maintain at least one active Android device running Paymently for continuous SMS forwarding.

- **Use Automatic Entry when possible**  
  It's more accurate and faster than manual entry. Only use Manual Entry as a fallback.

- **Approve promptly**  
  Review and approve Awaiting Review records quickly to enable automatic payment verification.

- **Verify before approving**  
  Check for "Balance verify mismatch" warnings and verify transaction details before approving.

- **Enable Pending Payment**  
  In gateway settings, enable Pending Payment as a fallback when devices go offline.

- **Monitor Used records**  
  Regularly check Used SMS Data to ensure payments are matching correctly.

- **Don't delete unnecessarily**  
  Keep SMS Data for audit trails. Only delete obvious duplicates or errors.

- **Handle duplicates carefully**  
  If you receive duplicate SMS for the same transaction, keep only one as Approved.

::: warning
Never approve SMS Data without verification. Fraudulent SMS Data records could lead to unauthorized payment approvals.
:::