---
title: Import & Export Customers
---

# Import & Export Customers

The **Actions** menu on the Customer list provides **Export customers** and **Import customers**.

## Export customers

Choose the columns to include, then select **Export**. The export contains one row per customer.

- Columns: Name, Email, Phone, Address, City, State, Postcode, Country
- File format: CSV (UTF-8, comma separated)

::: tip
Select only the columns you need for the target system. This keeps the export small and easier to verify.
:::

## Import customers

Use **Import customers** to bulk create or update records from a CSV file.

### CSV format

- File type: CSV (UTF-8)
- Header row is required
- Columns are case-insensitive; unknown columns are ignored

#### Supported headers

- `name` *(required)*
- `email` *(required)*
- `phone` *(required)*
- `address`
- `city`
- `state`
- `postcode`
- `country`

#### Example

```csv
name,email,phone,address,city,state,postcode,country
Jane Doe,jane@example.com,+1 555 0100,221B Baker Street,London,,NW1,GB
John Smith,john@example.com,+8801712345678,House 12, Dhaka,Dhaka,1207,BD
```


### Validation

* **Name**: non-empty string
* **Email**: valid email format
* **Phone**: string; use international format when possible (E.164)
* Optional address fields are stored as provided

### Create vs update

If a row’s email matches an existing customer, that record is **updated**.
Otherwise, a **new** customer is created.

::: warning
Make sure emails are unique and stable. If the same person appears with multiple emails, multiple customer records will be created.
:::

### Common issues

* **Encoding** — Save as UTF-8 without BOM.
* **Delimiters** — Use commas. If a field contains commas, wrap it in quotes.
* **Headers missing** — Include the header row; otherwise columns may not map correctly.

::: tip
Import a small test file first, verify the results, then run the full import.
:::