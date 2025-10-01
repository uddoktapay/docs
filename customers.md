---
title: Customers
---

# Customers

- [Introduction](#introduction)
- [Create & Edit Customers](#create-edit-customers)
  - [Creating a new customer](#creating-a-new-customer)
  - [Editing customer details](#editing-customer-details)
- [Import & Export Customers](#import-export-customers)
  - [Export customers](#export-customers)
  - [Import customers](#import-customers)
- [Customer Actions](#customer-actions)

## Introduction

The **Customers** section lets you maintain a directory of people or businesses who make payments through your system. Each customer record includes:

- Basic identity fields (name, email, phone)
- Optional address details (address, city, state, postcode, country)
- A unique record that links to their payments and invoices

Customers can be created manually, imported from a file, or updated directly in the system. Maintaining accurate customer records improves reporting, prevents duplicates, and enables better customer relationship management.

## Create & Edit Customers

### Creating a new customer

To add a customer manually:

1. Click **New customer** from the Customers page.
2. Fill in the required fields:
   - **Name**
   - **Email**
   - **Phone**
3. Optionally add address details (Address, City, State, Postcode, Country).
4. Click **Save**.

::: tip
Keep customer information accurate and complete. This improves reporting and helps prevent duplicates.
:::

### Editing customer details

To update an existing customer:

1. Find the customer in the list.
2. Click the **Edit** button.
3. Update the necessary fields.
4. Click **Save**.

::: warning
Changing a customer's email address may affect how the system matches them to existing payments and invoices. Ensure the new email is correct before saving.
:::

## Import & Export Customers

The **Actions** menu on the Customer list provides **Export customers** and **Import customers** options for bulk operations.

### Export customers

Export customer data to a CSV file for backup, reporting, or migration purposes.

**Steps:**

1. Click **Actions** → **Export customers**.
2. Choose the columns to include in the export.
3. Click **Export**.

**Export details:**

- **Columns available:** Name, Email, Phone, Address, City, State, Postcode, Country
- **File format:** CSV (UTF-8, comma separated)
- **Output:** One row per customer with selected columns

::: tip
Select only the columns you need for the target system. This keeps the export small and easier to verify.
:::

### Import customers

Use **Import customers** to bulk create or update customer records from a CSV file.

**Steps:**

1. Click **Actions** → **Import customers**.
2. Prepare your CSV file following the format requirements below.
3. Select your CSV file.
4. Review the preview and validation results.
5. Click **Import** to process the file.

#### CSV format requirements

- **File type:** CSV (UTF-8)
- **Header row:** Required (first row must contain column names)
- **Columns:** Case-insensitive; unknown columns are ignored
- **Delimiter:** Comma (`,`)

#### Supported headers

| Header | Required | Description |
| --- | --- | --- |
| `name` | Yes | Customer's full name |
| `email` | Yes | Email address (used for matching existing records) |
| `phone` | Yes | Contact phone number |
| `address` | No | Street address |
| `city` | No | City name |
| `state` | No | State or province |
| `postcode` | No | Postal code |
| `country` | No | Country code (e.g., BD, US, GB) |

#### Example CSV

```csv
name,email,phone,address,city,state,postcode,country
Jane Doe,jane@example.com,+1 555 0100,221B Baker Street,London,,NW1,GB
John Smith,john@example.com,+8801712345678,House 12,Dhaka,Dhaka,1207,BD
Alice Johnson,alice@example.com,+44 20 7946 0958,10 Downing Street,London,,SW1A 2AA,GB
```

#### Validation rules

- **Name:** Non-empty string
- **Email:** Valid email format (used as unique identifier)
- **Phone:** String; use international format when possible (E.164 recommended, e.g., +8801712345678)
- **Optional fields:** Stored as provided; no specific validation

#### Create vs Update behavior

The import system uses the **email address** to determine whether to create or update:

- **Email matches existing customer:** The record is **updated** with new values.
- **Email not found:** A **new customer** is created.

::: warning
Make sure emails are unique and stable. If the same person appears with multiple emails, multiple customer records will be created.
:::

#### Common import issues

| Issue | Solution |
| --- | --- |
| **Encoding errors** | Save your CSV as UTF-8 without BOM |
| **Fields not mapping** | Ensure header row is present and column names match supported headers |
| **Data in wrong columns** | Verify delimiter is comma; if fields contain commas, wrap them in quotes |
| **Duplicate customers** | Use consistent email addresses; check for typos before importing |
| **Special characters broken** | Ensure file is saved with UTF-8 encoding |

::: tip
**Best practice:** Import a small test file first (3-5 rows), verify the results, then run the full import. This helps catch formatting issues early.
:::

## Customer Actions

Available actions for customer records:

| Action | Description |
| --- | --- |
| **View** | Display customer details and associated payments/invoices |
| **Edit** | Update customer information |
| **Delete** | Permanently remove the customer record |
| **Export** | Export selected customers to CSV |
| **Import** | Bulk create or update customers from CSV |

::: warning
Deleting a customer removes their record from the system. Associated payments and invoices will remain but won't be linked to a customer. Only delete customer records if they were created by mistake.
:::