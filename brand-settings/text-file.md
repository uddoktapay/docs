---
title: Text File
---

# Text File

Use **Text Files** to host small, text-only files (e.g., Google site verification, payment provider/domain verification) directly from your UddoktaPay instance—without server or DNS access.

- Supported formats: **TXT**, **XML** and **HTML**  
- Public URL pattern: `https://your-domain.tld/{filename}`  
  - Example: `https://selfhosted.test/payeer_2225076242.txt`

::: tip
Only **active** files are publicly accessible. You can enable/disable any file at any time.
:::

---

## When to use

- **Google Search Console** site verification (`googleXXXXXXXXXXXX.html` / `.txt`)  
- **Payment provider** account/domain verification (e.g., Payeer, Stripe, PayPal TXT tokens)  
- **Other text-based ownership checks** that require a public URL returning exact content

---

## How it works

- When you upload a file, its **filename** and **content** are stored in the database.  
- UddoktaPay serves it from a public route that matches the exact filename you uploaded.  
- Toggling **Active** immediately shows/hides the file on the public URL—no deployment needed.

::: warning
Do not upload secrets, API keys, or customer data. These files are designed to be public.
:::

---

## Upload a new file

1. Click **Upload Text File**.  
2. **Select File** (TXT, XML & HTML).  
3. Leave **Active** turned on to publish immediately (you can disable later).  
4. Click **Create**.  

After upload, the file appears in the list with actions and its public status.

**What gets stored**

- **Filename** (e.g., `payeer_2225076242.txt`)  
- **Type** (TXT, XML & HTML)  
- **Content** (exact file contents)  
- **Active** (visibility toggle)

---

## Manage files

On the **Text Files** list:

- **Active toggle** — show or hide the file publicly.  
- **Copy** — copies the public URL to your clipboard.  
- **Delete** — removes the file and its URL.  

You can also search by filename when you have many entries.

::: tip
If a verification service requires an exact filename, upload the file **with the exact name** they specify. Avoid renaming after submitting the URL to the verifier.
:::

---

## URL format

- Public URL: `https://your-domain.tld/{filename}`  
- The route matches the **exact** filename (case-sensitive on some systems).  
- Example:  `https://selfhosted.test/payeer_2225076242.txt`

If the file is **inactive** or deleted, the URL will no longer serve content.

---

## Best practices

- Keep filenames short, lowercase, and without spaces (use hyphens/underscores).  
- Upload **only** the file the verifier gave you—no extra characters or BOM encoding.  
- If the verifier caches results, wait a few minutes and re-try verification.  
- Use **Active** toggle to temporarily suspend access without deleting the record.  
- Remove old verification files you no longer need.

---

## Troubleshooting

- **404 Not Found**  
  - Check that the file is **Active**.  
  - Confirm the filename and extension are exactly correct.  
  - Make sure you’re using the correct domain/brand instance.

- **Verifier says content mismatch**  
  - Re-download the file from the provider and re-upload to ensure exact bytes.  
  - Ensure the file doesn’t include extra whitespace or encoding marks (like BOM).

- **Verification still failing**  
  - Copy the URL using the **Copy** action to avoid typos.  
  - Some services take time to re-check; wait and try again.  
  - If you changed the filename after submitting to the provider, resubmit the **new** URL.

::: tip
You can keep multiple verification files active at once—for example, one for Google and another for a payment provider.
:::
