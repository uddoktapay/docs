---
title: Invoices
---

# Invoices

- [Introduction](#introduction)
- [Invoice statuses](#invoice-statuses)
- [Create Invoice](#create-invoice)
  - [Invoice fields](#invoice-fields)
  - [Adding items](#adding-items)
  - [Calculating totals](#calculating-totals)
- [Invoice Actions](#invoice-actions)
  - [Mark as Paid](#mark-as-paid)
  - [Send Unpaid Email](#send-unpaid-email)
  - [Cancel](#cancel)
  - [Delete](#delete)
- [Email variables and shortcodes](#email-variables-and-shortcodes)
  - [Available variables](#available-variables)
  - [Available shortcodes](#available-shortcodes)

## Introduction

Invoices let you bill customers and track payments against those bills. An invoice contains one or more items, optional discounts and taxes, and a status that reflects whether it is paid, unpaid, refunded, or canceled.

Invoices link to **customers**, **payments**, and **gateways**. You can create invoices manually, send reminders, and record payments. Each invoice generates a unique payment URL that customers can use to complete payment through your configured gateways.

## Invoice statuses

Invoices can exist in the following statuses:

- **Paid** – Full payment has been received and recorded.  
- **Unpaid** – The invoice has been created but no payment has been received.  
- **Pending** – Payment is being processed or awaiting verification.  
- **Canceled** – The invoice was canceled and is no longer payable.  
- **Refunded** – The invoice payment was fully returned to the customer.  

::: tip
Invoice status updates automatically when payments are recorded. You can also manually change status when needed.
:::

## Create Invoice

To create a new invoice:

1. Click **New invoice** from the Invoices page.
2. Choose a **Customer** (or create a new one if needed).
3. Set the invoice details:
   - **Currency**
   - **Due Date**
   - **Status** (usually *Unpaid*)
4. Add invoice **Items** (see below).
5. Configure additional charges:
   - **Shipping** (optional)
   - **Discount** (optional, fixed or percentage)
   - **VAT/Tax** (optional)
6. Add **Notes** for internal reference or customer information.
7. Click **Save**.

After saving, the invoice appears in the list and can be viewed, edited, sent to the customer, or linked to payments.

### Invoice fields

| Field | Description | Required |
| --- | --- | --- |
| **Customer** | The customer being billed | Yes |
| **Currency** | Currency for all amounts on the invoice | Yes |
| **Due Date** | Payment deadline | Yes |
| **Status** | Current state (Unpaid, Paid, Pending, Canceled, Refunded) | Yes |
| **Shipping** | Additional shipping or delivery charges | No |
| **Discount** | Fixed amount or percentage discount | No |
| **VAT/Tax** | Tax rate or amount | No |
| **Notes** | Internal notes or customer instructions | No |

### Adding items

Each invoice must contain at least one line item. For each item, specify:

| Field | Description | Required |
| --- | --- | --- |
| **Description** | Clear description of the product or service | Yes |
| **Quantity** | Number of units | Yes |
| **Amount** | Price per unit | Yes |
| **Discount** | Item-level discount (fixed or percentage) | No |
| **VAT** | Item-level tax rate | No |

::: tip
Use specific, descriptive item names. Instead of "Service Fee," use "Website Development - Homepage Redesign" so customers understand exactly what they're paying for.
:::

### Calculating totals

The invoice automatically calculates:

1. **Subtotal** = Sum of (Quantity × Amount) for all items, minus item-level discounts
2. **After discount** = Subtotal minus invoice-level discount
3. **Shipping** = Added to subtotal
4. **VAT/Tax** = Applied to subtotal (after discount and shipping, depending on configuration)
5. **Total** = Final amount due

::: warning
Ensure your discount and tax calculations match your business requirements and local regulations. Test with sample invoices before sending to customers.
:::

## Invoice Actions

Invoices support several actions from the list or detail page.

### Mark as Paid

Record a payment against the invoice manually when payment is received outside the system or through a non-integrated gateway.

**Steps:**

1. SSelect the invoice from the list.
2. Click **Mark as Paid**.
3. Select the **Gateway** through which payment was received.
4. Enter the **Transaction ID** from the gateway.
5. Click **Save**.

This creates a payment record linked to the invoice and updates the invoice status to **Paid**.

::: tip
Always include the gateway transaction ID when marking as paid. This maintains an audit trail and helps with reconciliation.
:::

### Send Unpaid Email

Send a payment reminder to the customer. The email editor supports Markdown formatting and dynamic variables/shortcodes.

**Steps:**

1. Select the invoice from the list.
2. Click **Send Unpaid Email**.
3. Customize the email template (optional).
4. Click **Send**.

The customer receives an email with invoice details and a payment link.

::: tip
Schedule regular reminders for unpaid invoices. Consider sending reminders at strategic intervals to encourage timely payment.
:::

### Cancel

Marks the invoice as **Canceled**. Use this when a bill should no longer be payable but must remain in history.

**When to cancel:**

- Order was canceled by customer
- Service was not delivered
- Invoice was created in error but needs to remain for audit purposes
- Replaced by a corrected invoice

**Steps:**

1. Select the invoice from the list.
2. Click **Cancel** or change status to **Canceled**.
3. Confirm the action.

::: warning
Canceled invoices cannot be paid. If you need to reactivate an invoice, you'll need to create a new one.
:::

### Delete

Permanently removes the invoice from the system.

**Steps:**

1. Select the invoice from the list.
2. Click **Delete**.
3. Confirm the action.

::: warning
Use **Delete** only when absolutely necessary. Prefer **Cancel** to preserve history and maintain accurate reports. Deleted invoices cannot be recovered.
:::

## Email variables and shortcodes

When sending unpaid email reminders, you can use dynamic variables and shortcodes to personalize the message.

### Available variables

Variables are replaced with actual invoice data when the email is sent:

| Variable | Description | Example Output |
| --- | --- | --- |
| `{name}` | Customer name | John Smith |
| `{invoice_id}` | Invoice reference number | INV-2024-001 |
| `{amount}` | Total amount due | $150.00 |
| `{due_date}` | Payment deadline | October 15, 2024 |
| `{days_overdue}` | Days past due date | 5 |
| `{payment_url}` | Direct link to payment page | https://pay.example.com/inv/... |
| `{status}` | Current invoice status | Unpaid |
| `{brand_name}` | Your business name | Acme Corporation |

**Example usage:**

```markdown
Dear {name},

This is a reminder that invoice {invoice_id} for {amount} is due on {due_date}.

Please complete payment at your earliest convenience: {payment_url}

Thank you,
{brand_name}
```

### Available shortcodes

Shortcodes insert pre-formatted HTML components:

| Shortcode | Description |
| --- | --- |
| `{payment_button}` | Styled button linking to payment page |
| `{divider}` | Horizontal line separator |
| `{signature}` | Email signature with brand name and contact info |

**Example with shortcodes:**

```markdown
Dear {name},

Your invoice {invoice_id} for {amount} is now due.

{payment_button}

{divider}

If you have any questions, please contact us.

{signature}
```

::: tip
`{signature}` uses your brand name and contact details automatically. Include `{payment_button}` for a prominent one-click payment link that improves conversion rates.
:::