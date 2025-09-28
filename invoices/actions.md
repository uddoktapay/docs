---
title: Invoice Actions
---

# Invoice Actions

Invoices support several actions from the list or detail page.

## Mark as Paid

Record a payment against the invoice.

- Select **Gateway**.
- Enter **Transaction ID**.

This links the recorded payment to the invoice and updates its status.

## Send Unpaid Email

Send a reminder to the customer. The editor supports Markdown and shortcodes.

Common variables:

- `{name}`
- `{invoice_id}`
- `{amount}`
- `{due_date}`
- `{days_overdue}`
- `{payment_url}`
- `{status}`
- `{brand_name}`

Common shortcodes:

- `{payment_button}`
- `{divider}`
- `{signature}`

::: tip
`{signature}` uses your brand name automatically. Include `{payment_button}` for a one-click payment link.
:::

## Cancel

Marks the invoice as canceled. Use this when a bill should no longer be payable but must remain in history.

## Delete

Removes the invoice entirely.

::: warning
Use **Delete** only when necessary. Prefer **Cancel** to preserve history and reports.
:::
