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

## Introduction

Payment Links let you collect one-time payments from a hosted checkout page—no code required. Each payment link generates a unique URL that you can share with customers via email, SMS, social media, or any other channel. When customers visit the link, they see a branded checkout page and can complete payment using your configured gateways.

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

Below the main form, you'll see a **User input fields** section where you can add, configure, and reorder custom fields.

::: tip
Use clear, descriptive product names (e.g., "Workshop Seat – Early Bird" instead of "Product 1"). It makes searching, reporting, and customer communication much easier.
:::