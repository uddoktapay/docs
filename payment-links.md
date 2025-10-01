---
title: Payment Links
---

# Payment Links

- [Introduction](#introduction)
- [Types of links](#types-of-links)
  - [Default Link](#default-link)
  - [Custom Payment Link](#custom-payment-link)
- [Create a Payment Link](#create-a-payment-link)
  - [Required fields](#required-fields)
  - [Optional fields](#optional-fields)
  - [User input fields](#user-input-fields)
  - [Save options](#save-options)
- [Manage Payment Links](#manage-payment-links)
  - [Available actions](#available-actions)
- [User Input Fields](#user-input-fields-1)
  - [Available field types](#available-field-types)
  - [Field configuration](#field-configuration)
- [Payment Link Best Practices](#payment-link-best-practices)

## Introduction

Payment Links let you collect one-time payments from a hosted checkout page—no code required.

Open **Payment Links** from the sidebar to view your list with columns for **Product name**, **Product description**, **Amount**, **Quantity**, and **Status**. Each link has an inline **Status** toggle and actions (**Edit**, **Copy**, **Delete**).

Each payment link generates a unique URL that you can share with customers via email, SMS, social media, or any other channel. When customers visit the link, they see a branded checkout page and can complete payment using your configured gateways.

## Types of links

### Default Link

A brand-level checkout form suitable for quick payments and donations.

- Uses a generic form with fields like name, email, mobile, amount, and optional reference.  
- Does not include product-specific settings such as quantity or expiry.  
- Shareable as a single evergreen URL.
- Accessible via the **Copy Default Link** button at the top of the payment links list.
- Ideal for flexible-amount donations or general-purpose payments.

### Custom Payment Link

A product-specific checkout page generated from the "Create payment link" form.

- Shows product name and description on the page.  
- Uses currency, amount, and optional expiry date set during creation.  
- Can include custom user input fields.  
- Status toggle allows you to publish or unpublish the link without deleting it.
- Perfect for fixed-price products, services, or event registrations.

::: tip
Use the **Default Link** for flexible or donation-style payments.  
Use a **Custom Payment Link** when you need fixed pricing, product details, or custom fields per link.
:::

## Create a Payment Link

Go to **Payment Links → New payment link** and complete the form.

### Required fields

The following fields are required to create a payment link (marked with red asterisk *):

- **Product name** — Clear, descriptive name shown to customers (e.g., "Workshop Seat – Early Bird")
- **Quantity** — Number of units available (set to a high number for unlimited availability)
- **Currency** — Currency for this payment link (e.g., BDT, USD)
- **Amount** — Fixed price per unit
- **Status** — Toggle to publish or unpublish the link

### Optional fields

Enhance your payment link with additional settings:

- **Product description** — Detailed information shown on the checkout page (appears as a textarea field)
- **Expire Date** (`dd/mm/yyyy`) — After this date, the link will no longer accept payments

::: warning
If you set an expiry date, customers will see an error when trying to access the link after that date. Plan expiry dates carefully for time-sensitive offers.
:::

### User input fields

Add custom fields your customers must fill in during checkout. These fields allow you to collect additional information like:

- Reference numbers
- Delivery addresses
- Event preferences
- Special instructions

Below the main form, you'll see a **User input fields** section where you can add, configure, and reorder custom fields. See [User Input Fields](#user-input-fields-1) below for detailed configuration options.

::: tip
Use clear, descriptive product names (e.g., "Workshop Seat – Early Bird" instead of "Product 1"). It makes searching, reporting, and customer communication much easier.
:::

### Save options

Choose how to save your payment link:

- **Create** — Save and return to the payment links list  
- **Create & create another** — Save and immediately open a new blank form for creating another link

::: tip
Use **Create & create another** when setting up multiple payment links for an event or product launch. It saves time by keeping you in the creation flow.
:::

## Manage Payment Links

From the payment links list, you can perform several actions on existing links. The list displays:

- **Product name** — Name of the product or service
- **Product description** — Brief description
- **Amount** — Price per unit
- **Quantity** — Available units
- **Status** — Published/Unpublished toggle

Use the **Search** bar at the top right to quickly find specific payment links.

### Available actions

For each payment link, the following actions are available:

- **Edit** — Modify link details, pricing, fields, or settings
- **Copy** — Copy the shareable URL to send to customers
- **Delete** — Permanently remove the payment link
- **Status Toggle** — Inline toggle to publish or unpublish the link without opening the edit form

::: tip
Use the **Copy** button to quickly grab the payment link URL and share it with customers. The status toggle lets you quickly enable/disable links without editing.
:::

::: warning
Deleting a payment link does not affect payments already made through it. Those payment records remain in your system. However, the link URL will no longer work for new customers.
:::

## User Input Fields

User input fields allow you to collect extra information from customers during checkout. They appear on the payment page after the standard fields (name, email, mobile).

### Available field types

The system supports the following input types:

- **Text** — Single-line text input (e.g., reference number, company name)
- **Textarea** — Multi-line text input (e.g., delivery address, special instructions)
- **Select** — Dropdown with predefined options (e.g., t-shirt size, workshop session)
- **Radio** — Single choice from multiple options (e.g., payment method preference)
- **Checkbox** — Multiple selections allowed (e.g., additional services)
- **File** — File upload capability (e.g., registration forms, ID proof)

::: tip
Match the field type to your data needs. Using **Select** or **Radio** for predefined options helps prevent input errors and standardizes responses.
:::

### Field configuration

For each field you add, configure the following:

- **Form Type** — Select the input type from the dropdown (Text, Textarea, Select, Radio, Checkbox, File)
- **Field Name** — Label displayed to the customer (keep it clear and concise)
- **Is Required** — Toggle to enforce completion before payment

**Reordering fields:** Use the drag handles (↕ ↑ ↓) on the left side of each field to arrange them in the order you want customers to see them.

**Deleting fields:** Click the red trash icon on the right side of each field to remove it.

**Adding new fields:** Click the **+ Add new field** button at the bottom to add another custom field.

::: tip
Keep required fields minimal to reduce friction and improve conversion. Only mark fields as required if you absolutely need that information to fulfill the order.
:::

**Example configuration:**

| Form Type | Field Name | Is Required |
|-----------|------------|-------------|
| Textarea | Delivery Address | Yes |
| Select | Preferred Delivery Date | No |
| Radio | T-Shirt Size | Yes |
| Checkbox | Additional Services | No |
| File | ID Proof | No |

## Payment Link Best Practices

Follow these practices to create effective payment links:

- **Use descriptive names**  
  Choose clear product names that immediately tell customers what they're paying for.

- **Set realistic expiry dates**  
  For time-sensitive offers, set an expiry date. For evergreen products, leave it blank.

- **Minimize required fields**  
  Only require information you truly need. Each additional field reduces completion rates.

- **Test before sharing**  
  Copy your payment link and open it in an incognito window to see exactly what customers will experience.

- **Use the Status toggle strategically**  
  Unpublish links during maintenance or when temporarily out of stock instead of deleting them.

- **Use the Copy Default Link**  
  For quick, flexible-amount payments, use the Default Link instead of creating multiple custom links.

- **Monitor quantity limits**  
  If you set a quantity limit, check regularly to ensure availability for customers.

- **Keep descriptions concise**  
  Write clear, benefit-focused descriptions that help customers understand what they're purchasing.

- **Match currencies to gateways**  
  Ensure the payment link currency matches at least one active gateway configuration.

- **Organize with search**  
  Use the search functionality to quickly find and manage specific payment links.

- **Review payment link performance**  
  Periodically audit which links generate the most payments and optimize accordingly.

::: tip
Share payment links through multiple channels (email, SMS, social media, QR codes) to maximize reach. Track which channels drive the most conversions to optimize your marketing efforts.
:::

::: warning
Remember that customers can share payment links with others. If you need restricted access, consider using invoices instead, which are customer-specific.
:::