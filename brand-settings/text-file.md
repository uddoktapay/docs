---
title: Text File
---

# Text File

- [Introduction](#introduction)
- [When to Use](#when-to-use)
- [How It Works](#how-it-works)
- [Upload Text File](#upload-text-file)
- [Manage Text Files](#manage-text-files)
- [URL Format](#url-format)
- [Troubleshooting](#troubleshooting)

## Introduction

Text Files allow you to host small, text-based verification files directly from your UddoktaPay instance without requiring server or DNS access.

Access Text Files from **Brand Settings → Text File** to manage publicly accessible verification files.

**Supported formats:**
- TXT (text files)
- XML (markup files)
- HTML (web pages)

**Public URL pattern:**  
`https://your-domain.tld/{filename}`

Example: `https://example.test/payeer_2225076242.txt`

::: tip
Only **active** files are publicly accessible. Toggle the Active status to show/hide files instantly without deleting them.
:::

## When to Use

Text Files are designed for verification and ownership proof scenarios:

**Google Search Console**  
Site verification files (e.g., `googleXXXXXXXXXXXX.html` or `.txt`).

**Payment Provider Verification**  
Domain or account verification for providers like Payeer, Stripe, PayPal.

- Upload TXT tokens for domain verification
- Host verification files required by payment APIs
- Prove domain ownership to enable services

**Other Verification Services**  
Any service requiring a publicly accessible text file at a specific URL.

- DNS verification alternatives
- Ownership proof for third-party integrations
- Service activation files

## How It Works

**Storage:**
- Filename and content are stored in the database
- No physical file created on server
- Served from public route matching the filename

**Public Access:**
- UddoktaPay serves files from `https://your-domain.tld/{filename}`
- Route matches exact filename (case-sensitive)
- Toggling Active immediately shows/hides the file

**No deployment needed:**
- Changes take effect instantly
- Enable/disable without server access
- Update content without redeployment

::: warning
Do not upload secrets, API keys, or customer data. These files are publicly accessible by design.
:::

## Upload Text File

Click **Upload Text File** to add a new verification file.

**Select File** (required)  
Choose a TXT, XML, or HTML file from your computer.

- Accepted formats: .txt, .xml, .html
- File should contain exact verification content
- Avoid editing after download from verifier

**Active** (toggle)  
Enable to make file publicly accessible immediately.

- Toggle on (blue) — File accessible at public URL
- Toggle off (gray) — File not accessible
- Can be changed after upload

**What gets stored:**
- **Filename** — Exact name including extension (e.g., `payeer_2225076242.txt`)
- **Type** — File format (TXT, XML, HTML)
- **Content** — Complete file contents
- **Active** — Public visibility status

## Manage Text Files

The text files list displays all uploaded files with management options.

**Table columns:**
- **Filename** — File name with extension
- **Type** — File format badge
- **Active** — Toggle for public visibility
- **Actions** — Copy and Delete buttons

**Available actions:**

**Active Toggle**  
Show or hide file publicly.

- Inline toggle in table
- Immediate effect (no save required)
- Alternative to deleting

**Copy**  
Copy the public URL to clipboard.

- Click to copy full URL
- Paste directly into verification forms
- Ensures accurate URL without typos

**Delete**  
Remove file permanently.

- Deletes from database
- Public URL becomes unavailable
- Cannot be undone

Use the search bar to find specific files by filename.

## URL Format

**Public URL structure:**  
`https://your-domain.tld/{filename}`

**Examples:**
- `https://yoursite.com/google1234567890abcdef.html`
- `https://payments.example.com/stripe-verification.txt`

**Important notes:**
- Route matches **exact** filename (case-sensitive on some systems)
- File must be **Active** to be accessible
- Inactive or deleted files return 404 Not Found
- No additional path segments (file is at root level)

## Troubleshooting

**404 Not Found**

Check these common issues:
- File Active status is toggled off
- Filename doesn't match exactly (check case)
- Wrong domain or brand instance
- File was deleted

**Content Mismatch**

Verification service reports incorrect content:
- Re-download file from provider
- Upload fresh copy without editing
- Check for extra whitespace
- Verify no BOM or encoding issues
- Ensure complete content copied

**Verification Failing**

Service won't verify despite correct file:
- Use Copy button to get exact URL
- Wait for service cache to refresh (may take minutes/hours)
- Confirm filename matches what you submitted
- Check file is Active
- Try verification again after waiting

**Case Sensitivity Issues**

Some systems are case-sensitive:
- Match exact case provided by verifier
- Avoid renaming after upload
- Test URL in browser to confirm access

::: tip
**Multiple verifications:** You can keep several verification files active simultaneously. For example, maintain both Google Search Console and payment provider verification files at the same time.
:::

::: tip
**Caching:** Some verification services cache results. If verification fails initially, wait 5-10 minutes and retry before troubleshooting further.
:::