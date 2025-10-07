---
title: cPanel Installation
---

# cPanel Installation Guide

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation Overview](#installation-overview)
- [Step 1: Create Subdomain](#step-1-create-subdomain)
- [Step 2: Upload Installer File](#step-2-upload-installer-file)
- [Step 3: Extract Installer Files](#step-3-extract-installer-files)
- [Step 4: Create Database](#step-4-create-database)
- [Step 5: Configure Database Connection](#step-5-configure-database-connection)
- [Step 6: Create Admin Account](#step-6-create-admin-account)
- [Step 7: Deploy Application](#step-7-deploy-application)
- [Step 8: Access Admin Panel](#step-8-access-admin-panel)
- [Next Steps](#next-steps)

## Introduction

This comprehensive guide walks you through installing UddoktaPay on cPanel hosting environments. The installation process is straightforward and takes approximately **15-20 minutes** from start to finish.

All screenshots are taken from cPanel's Jupiter theme (latest version). Your interface may appear slightly different depending on your hosting provider's cPanel theme, but functionality remains identical across all versions.

## Prerequisites

Before beginning installation, verify you have the following:

**Hosting Requirements:**
- Active cPanel hosting account (cPanel 11.108 or higher recommended)
- PHP 8.2 or higher with IonCube Loader support
- MySQL 5.7+ or MariaDB 10.3+ database support
- Minimum 512MB PHP memory_limit
- SSL certificate (recommended for production use)

**Installation Materials:**
- Domain or subdomain pointed to your hosting server
- UddoktaPay installer file downloaded from [my.uddoktapay.com](https://my.uddoktapay.com)
- Valid license key from [my.uddoktapay.com](https://my.uddoktapay.com)

::: warning System Requirements
Ensure your hosting environment meets all requirements before proceeding. Installation will fail if PHP version or required extensions are missing.
:::

## Installation Overview

The installation process follows six main steps:

1. **Create Subdomain** — Set up dedicated subdomain for UddoktaPay
2. **Upload Files** — Transfer installer package to your server
3. **Extract Files** — Unzip installer in subdomain directory
4. **Create Database** — Set up MySQL database and user
5. **Run Installer** — Configure database connection
6. **Create Admin** — Set up administrator account

**Estimated completion time:** 15-20 minutes


## Step 1: Create Subdomain

Set up a dedicated subdomain for your UddoktaPay installation.

### Access Domains Section

1. Log into your cPanel account
2. Use the search bar at the top and type **"Domains"**
3. Click **Domains** from the search results

![Access Domains](/assets/installation/cpanel/1-search-domain.png)

**Alternative:** Navigate to the **Domains** section in cPanel home and click **Domains**.

### Create New Subdomain

1. Click **Create A New Domain** button in the top right corner

![Create New Domain Button](/assets/installation/cpanel/2-create-domain-button.png)

2. Fill in the domain creation form:
   - **Domain** — Enter your subdomain (e.g., `pay.example.com`)
   - **Document Root** — Auto-populates as `/public_html/pay.example.com`
   - **Share document root** — Leave unchecked to keep subdomain separate

![Domain Creation Form](/assets/installation/cpanel/3-domain-form.png)

3. Click **Submit** to create the subdomain

### Verify Subdomain Creation

After creation, verify your subdomain appears in the domains list with the correct document root path.

![Subdomain Listed](/assets/installation/cpanel/4-subdomain-listed.png)

::: tip Quick File Manager Access
Click the **document root path** (e.g., `/pay.example.com`) in the subdomain list to open File Manager directly in that folder. This saves navigation time in the next step.
:::

**Subdomain naming recommendations:**
- ✅ Use clear names: `pay.yourdomain.com`, `payment.yourdomain.com`, `gateway.yourdomain.com`
- ❌ Avoid: `test123.yourdomain.com`, overly complex names, or random strings



## Step 2: Upload Installer File

Transfer the UddoktaPay installer package to your subdomain directory.

### Open File Manager

**Quick Method (Recommended):**
1. From the Domains page, click the **document root path** link (e.g., `/pay.example.com`)
2. File Manager opens directly in your subdomain folder

**Alternative Method:**
1. Navigate to **Files** section in cPanel home
2. Click **File Manager**
3. Browse to `pay.example.com`

### Upload Installer Package

1. Click **Upload** button in the top toolbar

![Upload Button](/assets/installation/cpanel/5-upload-button.png)

2. On the upload page:
   - Drag and drop the `installer_****.zip` file into the upload area
   - Or click **Select File** to browse and select the file

![Upload Interface](/assets/installation/cpanel/6-upload-interface.png)

3. Wait for upload to complete (green progress bar shows 100%)
4. Click **Go Back to** link to return to your subdomain folder


## Step 3: Extract Installer Files

Unzip the installer package in your subdomain directory.

### Locate and Select Installer

1. In File Manager, locate `installer_****.zip` in your subdomain folder
2. Click the filename to select it (file row becomes highlighted)
3. Click **Extract** button in the top toolbar

![Select Installer File](/assets/installation/cpanel/7-select-installer.png)

### Extract Files

1. In the extract dialog:
   - Verify extraction path shows your subdomain folder (e.g., `/pay.example.com`)
   - Click **Extract File(s)** button

![Extract Dialog](/assets/installation/cpanel/8-extract-dialog.png)

2. Wait for extraction to complete
3. Click **Close** when finished

### Clean Up (Optional)

After successful extraction, you can delete the installer ZIP file to save disk space:

1. Select the `installer_****.zip` file
2. Click **Delete** button in toolbar
3. Confirm deletion when prompted

**After extraction, you should see:**
- `installer` folder
- `index.php` file
- Other installation files and directories



## Step 4: Create Database

Create a MySQL database using cPanel's Database Wizard for guided setup.

### Access Database Wizard

1. Return to cPanel home page
2. Search for **"Database"** in the search bar
3. Click **Database Wizard** under Tools section

![Database Search](/assets/installation/cpanel/9-database-search.png)

::: info Database Creation Methods
cPanel offers two methods for creating databases:
- **Database Wizard** — Step-by-step guided process (recommended for beginners)
- **MySQL Databases** — Manual setup for experienced users

This guide uses Database Wizard for simplicity and reliability.
:::

### Step 1: Create Database

1. Enter database name in the **New Database** field
   - cPanel automatically prefixes with your username (e.g., `username_example`)
   - Use a descriptive name like `uddoktapay` or `payment`

![Database Name](/assets/installation/cpanel/10-database-step1.png)

2. Click **Next Step** to continue

::: warning Record Database Name
Note the complete database name including the prefix (e.g., `username_uddoktapay`). You'll need this exact name when configuring the installer.
:::

### Step 2: Create Database User

1. Enter **Username** for the database user
   - Also prefixed with your cPanel username
   - Example: `dbuser` becomes `username_dbuser`

2. Create a strong **Password**:
   - Use the Password Generator for maximum security
   - Or create your own (minimum 8 characters)
   - Include uppercase, lowercase, numbers, and special characters
   - Password strength meter should show "Very Strong (100/100)"

![Database User Creation](/assets/installation/cpanel/11-database-step2.png)

3. Click **Create User** to proceed

::: danger Secure Storage Required
Save these database credentials immediately in a password manager or secure document. You cannot retrieve the password later from cPanel.
:::

### Step 3: Set User Privileges

1. Check **ALL PRIVILEGES** checkbox at the top
   - This automatically selects all individual permission checkboxes below
   - Required for UddoktaPay to function properly

![All Privileges](/assets/installation/cpanel/12-database-step3.png)

2. Click **Make Changes** button
3. Click **Next Step** to complete the wizard

**Your database credentials:**

| Credential | Format | Example |
|------------|--------|---------|
| **Database Host** | `localhost` or `127.0.0.1` | `localhost` |
| **Database Name** | `username_dbname` | `username_uddoktapay` |
| **Database Username** | `username_dbuser` | `username_dbuser` |
| **Database Password** | Your chosen password | `●●●●●●●●●●` |
| **Database Port** | `3306` (default) | `3306` |

**Keep these credentials available — you'll need them in the next step.**



## Step 5: Configure Database Connection

Access the UddoktaPay installer and connect to your database.

### Access Installer Interface

1. Open your web browser
2. Navigate to your subdomain URL (e.g., `https://pay.example.com`)
3. The installer loads automatically

### Verify System Requirements

The installer automatically checks your server environment and displays the results.

**If you see "System Ready - All requirements satisfied":**
- Proceed to database configuration
- All PHP extensions are properly installed

**If you see warnings about missing PHP extensions:**

**Option 1: Enable Extensions in cPanel**
1. Return to cPanel home
2. Navigate to **Software** section
3. Click **Select PHP Version**
4. Check boxes for missing extensions
5. Click **Save** and refresh the installer page

**Option 2: Contact Hosting Provider**
If you cannot enable extensions yourself:
- Contact your hosting provider's support
- Request PHP 8.2 or higher with IonCube Loader
- Provide the list of missing extensions from the installer

::: warning Common Missing Extensions
Most frequently missing extensions:
- IonCube Loader (required)
- mbstring
- pdo_mysql
- openssl
- tokenizer
- bcmath
- fileinfo
:::

### Configure Database Connection

1. Click **Configure Database Connection** button

![Configure Database Button](/assets/installation/cpanel/13-configure-database.png)

2. The database configuration form appears

3. Select **MySQL** as the Database Driver

![Database Driver Selection](/assets/installation/cpanel/14-select-mysql.png)

4. Fill in your database credentials:

| Field | Value | Notes |
|-------|-------|-------|
| **Database Driver** | MySQL | Select it |
| **Host** | `127.0.0.1` | Or try `localhost` if connection fails |
| **Port** | `3306` | Default MySQL port |
| **Database Name** | Full name with prefix | Example: `username_uddoktapay` |
| **Username** | Full username with prefix | Example: `username_dbuser` |
| **Password** | Your database password | Exact password from Step 4 |

![Database Configuration](/assets/installation/cpanel/15-database-config.png)

5. Click **Test Connection** button to verify credentials

**Common connection mistakes:**
- ❌ Forgetting the username prefix in database name or username
- ❌ Using `localhost` when `127.0.0.1` is required (or vice versa)
- ❌ Copy-paste errors introducing extra spaces in password
- ❌ Using wrong port number

::: tip Connection Testing
If connection fails with `localhost`, try `127.0.0.1` as the host. Some servers require one specific format.
:::


## Step 6: Create Admin Account

Set up your administrator account to manage UddoktaPay.

### Enter Admin Credentials

Fill in the admin account creation form with your details:

| Field | Description | Requirements |
|-------|-------------|--------------|
| **Admin Email** | Your email address | Valid email format; used for login |
| **Password** | Administrator password | Minimum 12 characters recommended |
| **Confirm Password** | Repeat password | Must match password field exactly |

![Validate Admin](/assets/installation/cpanel/16-validate-admin.png)

### Validate Admin Account

1. Double-check all information is correct
2. Click **Validate Admin** button to verify

**Admin password security requirements:**
- ✅ Minimum 12 characters (longer is better)
- ✅ Mix of uppercase and lowercase letters
- ✅ Include numbers and special symbols
- ✅ Never reuse passwords from other services
- ✅ Avoid personal information (names, birthdates, phone numbers)
- ✅ Use a password manager to generate and securely store

::: danger Critical Security Warning
This account has complete administrative access to your payment gateway. Use an extremely strong, unique password and enable two-factor authentication immediately after first login.
:::



## Step 7: Deploy Application

Complete the installation by deploying UddoktaPay to your server.

### Start Deployment

After successful admin validation, click **Deploy UddoktaPay** button

![Deploy Button](/assets/installation/cpanel/17-deploy-button.png)

### Deployment Process

The installer automatically performs these operations:

1. ✅ Validating system requirements and configurations
2. ✅ Creating environment configuration files
3. ✅ Running database migrations and creating tables
4. ✅ Seeding initial system data
5. ✅ Setting up file permissions for directories
6. ✅ Configuring application security settings
7. ✅ Creating administrator account

**Typical deployment time:** 2-5 minutes

::: warning Critical: Do Not Interrupt
**While deployment is running:**
- ❌ Do not close the browser tab or window
- ❌ Do not click the browser back button
- ❌ Do not navigate away from the page
- ❌ Do not refresh or reload the page

Interrupting deployment may corrupt the installation and require starting over.
:::

### Installation Complete

When deployment finishes successfully:
- You'll see a confirmation message
- The page automatically redirects to the admin login page
- Your UddoktaPay installation is ready to configure


## Step 8: Access Admin Panel

Log into your UddoktaPay administrative interface for the first time.

### First Login

1. Navigate to your admin login URL: `https://pay.yourdomain.com/admin`
2. Enter your admin email address
3. Enter your admin password
4. Click **Login** button

## Next Steps

Your cPanel installation is complete! Continue with the essential configuration steps:

**[Post-Installation Configuration →](/installation/post-installation)**
   - Validate license (required immediately)
   - Configure cron job (required immediately)
   - Set up brand settings
   - Configure email delivery

---

**Installation Complete!**

Your UddoktaPay payment gateway is now installed on cPanel. Continue to [Post-Installation Configuration →](/installation/post-installation) to complete the setup.