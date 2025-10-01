---
title: SMS Data
---

# SMS Data

- [Introduction](#introduction)
- [How it works](#how-it-works)
- [SMS Data List View](#sms-data-list-view)
  - [Table columns](#table-columns)
  - [Filters](#filters)
  - [Column customization](#column-customization)
  - [Available actions](#available-actions)
- [Connect Android App](#connect-android-app)
- [Create SMS Data](#create-sms-data)
  - [Entry types](#entry-types)
- [Automatic Entry](#automatic-entry)
  - [How to create automatic entry](#how-to-create-automatic-entry)
  - [Supported payment methods](#supported-payment-methods)
- [Manual Entry](#manual-entry)
  - [When to use manual entry](#when-to-use-manual-entry)
  - [Manual entry fields](#manual-entry-fields)
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

## SMS Data List View

The SMS Data list displays all transaction records with comprehensive filtering and management capabilities.

### Filters

Click the filter icon (with counter badge showing active filters) to access advanced filtering.

**Available filters:**

- **Payment method** — Filter by specific gateway (dropdown: All, bKash, Rocket, Nagad, etc.)
- **Type** — Filter by account type (dropdown: All, Personal, Merchant, Agent)
- **Status** — Filter by SMS Data status (dropdown: All, Approved, Awaiting Review, Used, Trashed)
- **Created From** — Start date filter (dd/mm/yyyy format)
- **Created Until** — End date filter (dd/mm/yyyy format)

**Using filters:**

1. Click the filter icon in the top right (shows badge with number of active filters)
2. Select your desired filter criteria from the dropdowns or date pickers
3. Filters apply automatically as you make selections
4. Click **Reset** (red text, top right) to clear all filters

The filter icon badge displays the number of active filters (e.g., "0" when no filters applied).

::: tip
Combine multiple filters to narrow down results. For example, filter by "bKash" payment method and "Awaiting Review" status to see pending bKash transactions requiring approval.
:::

### Column customization

Click the column icon (three vertical bars) next to the search to customize visible columns.

**Available columns:**

- **Device** ☐ (default: hidden)
- **Payment Method** ✓ (default: shown)
- **Type** ✓ (default: shown)
- **Phone Number** ✓ (default: shown)
- **Transaction ID** ✓ (default: shown)
- **Amount** ✓ (default: shown)
- **Balance** ✓ (default: shown)
- **Reference** ☐ (default: hidden)
- **Status** ✓ (default: shown)
- **Date** ☐ (default: hidden)

**To customize columns:**

1. Click the column customization icon
2. Check/uncheck columns to show/hide
3. Click **Apply columns** (blue button)
4. Click **Reset** (red text) to restore defaults

::: tip
Show the **Device** column if you have multiple Android devices connected to identify which device forwarded each SMS. Hide **Reference** if you don't use that field regularly.
:::

### Available actions

For **Approved** SMS Data:
- **Edit** — Modify SMS Data details
- **Delete** — Remove the SMS Data record

For **Awaiting Review** SMS Data:
- **Approve** — Approve the SMS Data for payment verification
- **Edit** — Modify SMS Data details
- **Delete** — Remove the SMS Data record

::: tip
**Balance verify mismatch** tooltip appears on some records, indicating the balance in the SMS doesn't match expected values. Review these carefully before approving.
:::

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

**Save options:**
- **Create** — Save and return to SMS Data list
- **Create & create another** — Save and open a new form
- **Back** — Return without saving

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

### Manual entry fields

When you select **Manual Entry**, the form displays these fields:

| Field | Description | Required |
|-------|-------------|----------|
| **Device** | The device that received the SMS | No |
| **Entry Type** | Set to "Manual Entry" | Yes |
| **Payment Method** | Gateway provider (dropdown) | Yes |
| **Type** | Account type: Personal, Merchant, or Agent | Yes |
| **Amount** | Transaction amount (with currency prefix, e.g., BDT) | Yes |
| **Phone Number** | Sender's phone number | Yes |
| **Transaction ID** | Transaction reference from the SMS | Yes |
| **Reference** | Additional reference information | No |
| **Note** | Internal notes about this transaction | No |
| **Status** | Approved, Awaiting Review, or Used | Yes |

**Type dropdown options:**
- **Personal** — Personal account transaction
- **Merchant** — Merchant account transaction
- **Agent** — Agent account transaction

**Status dropdown options:**
- **Awaiting Review** — Requires approval before use
- **Approved** — Ready for payment verification (default)
- **Used** — Already matched to a payment

**Save options:**
- **Create** — Save and return to SMS Data list
- **Create & create another** — Save and open a new form
- **Back** — Return without saving

::: tip
Use Manual Entry as a fallback when SMS messages can't be automatically parsed. If you have the SMS text, always try **Automatic Entry** first for accuracy.
:::

## Edit SMS Data

Click **Edit** from the actions menu to modify an existing SMS Data record.

**Editable fields:**

- **Device** — Connected device (dropdown)
- **Payment Method** — Gateway provider (dropdown, e.g., bKash)
- **Type** — Account type (dropdown: Personal, Merchant, Agent)
- **Amount** — Transaction amount with currency
- **Phone Number** — Sender's phone number
- **Transaction ID** — Transaction reference
- **Reference** — Additional reference (optional)
- **Note** — Internal notes (optional)
- **Status** — Current status (dropdown: Awaiting Review, Approved, Used)

**Actions:**
- **Save changes** (blue button) — Apply modifications
- **Back** — Return without saving
- **Delete** (red button, top right) — Remove the SMS Data record

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

- **Use filters effectively**  
  Combine payment method, type, status, and date filters to audit specific transaction groups.

- **Customize columns for workflow**  
  Show Device column if managing multiple devices, hide Reference if unused.

- **Don't delete unnecessarily**  
  Keep SMS Data for audit trails. Only delete obvious duplicates or errors.

- **Handle duplicates carefully**  
  If you receive duplicate SMS for the same transaction, keep only one as Approved.

- **Document in Notes**  
  Use the Note field to explain manual entries or unusual circumstances.

- **Match phone numbers consistently**  
  Ensure phone numbers in SMS Data match the format customers submit during checkout.

- **Review unmatched transactions**  
  If customers report "Transaction not found" errors, check if SMS Data exists for their TrxID.

- **Connect multiple devices for redundancy**  
  Use multiple devices in high-volume scenarios to ensure no SMS is missed.

- **Review date ranges regularly**  
  Use Created From/Until filters to audit SMS Data for specific time periods.

::: tip
For the best customer experience, combine automatic SMS Data with Pending Payment enabled. This ensures customers can complete checkout even during temporary device connectivity issues.
:::

::: warning
Never approve SMS Data without verification. Fraudulent SMS Data records could lead to unauthorized payment approvals.
:::