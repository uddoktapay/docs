---
title: cPanel Installation
---

# cPanel Installation Guide

This comprehensive guide walks you through installing UddoktaPay on cPanel hosting with detailed instructions and screenshots from the latest cPanel interface.

::: info cPanel Interface
Screenshots show cPanel's Jupiter theme. Your interface may appear slightly different depending on your hosting provider's cPanel theme, but functionality remains identical across all versions.
:::

## Prerequisites Checklist

Before beginning installation, ensure you have:

- ✅ **Active cPanel hosting account** with cPanel 11.108 or higher
- ✅ **PHP 8.2 or higher** with IonCube Loader support
- ✅ **MySQL 5.7+** or **MariaDB 10.3+** database support
- ✅ **Minimum 512MB PHP memory_limit**
- ✅ **Domain or subdomain** pointed to your hosting
- ✅ **UddoktaPay installer file** downloaded from [my.uddoktapay.com](https://my.uddoktapay.com)
- ✅ **SSL certificate** (recommended for production use)

::: tip Estimated Time
Complete installation takes approximately **15-20 minutes** from start to finish.
:::

---

## Installation Overview

**Progress Flow:**
```
Step 1: Domain Setup → Step 2: Upload Files → Step 3: Extract Files → 
Step 4: Create Database → Step 5: Run Installer → Step 6: Configure Admin
```

---

## Step 1: Create Subdomain

Set up a dedicated subdomain for your UddoktaPay installation.

### 1.1 Access Domains Section

1. Log into your cPanel account
2. Use the search bar at the top and type **"Domain"**
3. Click on **Domains** from the search results

![Access Domains](/assets/installation/cpanel/1-search-domain.png)

**Alternative:** Navigate to the **Domains** section in cPanel home and click **Domains**.

### 1.2 Create New Subdomain

1. Click the **Create A New Domain** button in the top right

![Create New Domain Button](/assets/installation/cpanel/2-create-domain-button.png)

2. Fill in the domain creation form:
   - **Domain:** Enter your subdomain (e.g., `pay.example.com`)
   - **Document Root:** Will auto-populate as `/public_html/pay.example.com`
   - **Share document root:** Leave **unchecked** (keep this subdomain separate)

![Domain Creation Form](/assets/installation/cpanel/3-domain-form.png)

3. Click **Submit** to create the subdomain

### 1.3 Verify Subdomain

After creation, verify your subdomain appears in the domains list with the correct document root path.

![Subdomain Listed](/assets/installation/cpanel/4-subdomain-listed.png)

::: tip Quick Access to File Manager
Click on the **document root path** (e.g., `/pay.example.com`) in the subdomain list to directly open File Manager in that folder. This saves navigation time!
:::

::: tip Subdomain Naming
Use clear, professional subdomains:
- ✅ `pay.yourdomain.com`
- ✅ `payment.yourdomain.com`
- ✅ `gateway.yourdomain.com`
- ❌ Avoid: `test123.yourdomain.com` or overly complex names
:::

---

## Step 2: Upload Installer File

Upload the UddoktaPay installer to your subdomain directory.

### 2.1 Open File Manager

**Quick Method (Recommended):**
1. From the Domains page in Step 1, click directly on the **document root path** link (e.g., `/pay.example.com`)
2. This opens File Manager directly in your subdomain folder

**Alternative Method:**
1. In cPanel home, navigate to **Files** section
2. Click **File Manager**
3. Navigate to `public_html/pay.example.com`

You should now see the File Manager open in your subdomain directory.

### 2.2 Upload Installer

1. Click the **Upload** button in the top toolbar

![Upload Button](/assets/installation/cpanel/6-upload-button.png)

2. On the upload page:
   - Either drag and drop the `installer_****.zip` file
   - Or click **Select File** to browse for the file

![Upload Interface](/assets/installation/cpanel/7-upload-interface.png)

3. Wait for the upload to complete (you'll see a green progress bar at 100%)
4. Click **Go Back to** link to return to your subdomain folder

::: info Upload Limits
Maximum file size shown in the upload interface. If your installer exceeds this limit, contact your hosting provider to increase the limit.
:::

---

## Step 3: Extract Installer Files

Unzip the installer file in your subdomain directory.

### 3.1 Locate Uploaded File

1. Back in File Manager, you should see `installer_****.zip` in your subdomain folder
2. Click on the filename to select it (it will be highlighted)
3. With the file selected, click the **Extract** button in the top toolbar

![Select Installer File](/assets/installation/cpanel/8-select-installer.png)

### 3.2 Extract Files

1. In the extract dialog:
   - Verify the extraction path shows your subdomain folder (e.g., `/pay.example.com`)
   - Click **Extract File(s)** button

![Extract Dialog](/assets/installation/cpanel/10-extract-dialog.png)

2. Wait for extraction to complete
3. Click **Close** when extraction finishes

### 3.3 Clean Up (Optional)

After successful extraction, you can delete the `installer_****.zip` file to save space:
1. Select the zip file
2. Click **Delete** in the toolbar
3. Confirm deletion

::: tip Verify Extraction
After extraction, you should see folders like `installer`, and files like `index.php` in your subdomain directory.
:::

---

## Step 4: Create Database

Create a MySQL database using cPanel's Database Wizard for guided setup.

### 4.1 Access Database Wizard

1. Return to cPanel home
2. Search for **"Database"** in the search bar
3. Click **Database Wizard** under Tools

![Database Search](/assets/installation/cpanel/11-database-search.png)

::: info Database Wizard vs MySQL Databases
- **Database Wizard:** Step-by-step guided process (recommended for beginners)
- **MySQL Databases:** Manual setup for experienced users

This guide uses Database Wizard for simplicity.
:::

### 4.2 Step 1: Create Database

1. Enter your database name in the **New Database** field
   - cPanel will prefix it with your username (e.g., `uddoktap_example`)
   - Use a descriptive name like `example` or `uddoktapay`

![Database Name](/assets/installation/cpanel/12-database-step1.png)

2. Click **Next Step**

::: warning Important
**Note the complete database name** including the prefix (e.g., `uddoktap_example`). You'll need this exact name during installer configuration.
:::

### 4.3 Step 2: Create Database User

1. Enter a **Username** for the database user
   - Will be prefixed with your cPanel username
   - Example: `example` becomes `uddoktap_example`

2. Enter a strong **Password** (or use the Password Generator)
   - Minimum 8 characters recommended
   - Include uppercase, lowercase, numbers, and special characters
   - Password strength meter will show "Very Strong (100/100)"

![Database User Creation](/assets/installation/cpanel/13-database-step2.png)

3. Click **Create User**

::: danger Security Notice
**Save these credentials securely** - you cannot retrieve the password later. Store in a password manager or secure document.
:::

### 4.4 Step 3: Set User Privileges

1. Check **ALL PRIVILEGES** checkbox at the top
   - This automatically selects all individual permissions below

![All Privileges](/assets/installation/cpanel/14-database-step3.png)

2. Click **Make Changes** button
3. Click **Next Step** to complete

::: tip Database Information Format
After completing the wizard, your database credentials will be:
- **Database Host:** `localhost` or `127.0.0.1`
- **Database Name:** `username_dbname` (e.g., `uddoktap_example`)
- **Database Username:** `username_dbuser` (e.g., `uddoktap_example`)
- **Database Password:** Your chosen password

**Keep these details handy for the next step!**
:::

---

## Step 5: Configure Database Connection

Run the UddoktaPay installer and connect to your database.

### 5.1 Access Installer

1. Open your web browser
2. Navigate to your subdomain (e.g., `https://pay.example.com`)
3. The installer will load automatically

### 5.2 System Requirements Check

The installer first checks your server environment:

If you see **"System Ready - All requirements satisfied"**, proceed to the next step.

**If you see warnings about missing PHP extensions:**

**Option 1: Enable Extensions in cPanel**
1. Return to cPanel home
2. Go to **Software** section → **Select PHP Version**
3. Check the boxes for missing extensions
4. Click **Save**
5. Refresh the installer page

**Option 2: Contact Hosting Provider**
If you cannot enable extensions yourself, contact your hosting provider and request:
- PHP 8.2 or higher
- IonCube Loader
- Any missing extensions shown in the warning

### 5.3 Configure Database

1. Click **Configure Database Connection** button

![Configure Database Button](/assets/installation/cpanel/16-configure-database.png)

2. The database setup form will appear. Select **MySQL** as the Database Driver

![Database Driver Selection](/assets/installation/cpanel/16-select-mysql.png)

3. Fill in your database credentials:

   - **Database Driver:** MySQL (selected by default)
   - **Host:** `127.0.0.1` (or `localhost`)
   - **Port:** `3306` (default MySQL port)
   - **Database Name:** Your full database name (e.g., `uddoktap_example`)
   - **Username:** Your full database username (e.g., `uddoktap_example`)
   - **Password:** The database password you created

![Database Configuration](/assets/installation/cpanel/17-database-config.png)

::: warning Common Mistakes
- ❌ Forgetting the username prefix (using `example` instead of `uddoktap_example`)
- ❌ Using `localhost` when `127.0.0.1` is required (or vice versa - try both if one fails)
- ❌ Copy-paste errors in password (ensure no extra spaces)
:::

4. Click **Test Connection** button to verify credentials

---

## Step 6: Create Admin Account

Set up your administrator account to manage UddoktaPay.

### 6.1 Enter Admin Details

Fill in the admin account creation form:

- **Admin Email:** Your email address (used for login)
- **Password:** Strong admin password (different from database password)
- **Confirm Password:** Re-enter the same password

![Validate Admin](/assets/installation/cpanel/20-validate-admin.png)

- Double-check all information is correct
- Click **Validate Admin** button

::: danger Critical Security
**Admin Password Best Practices:**
- Minimum 12 characters
- Mix of uppercase, lowercase, numbers, and symbols
- Never reuse passwords from other services
- Avoid personal information (names, birthdates, etc.)
- Use a password manager to generate and store it

**This account has full system access** - protect it carefully!
:::

## Step 7: Deploy Application

If validation succeeds, click **Deploy UddoktaPay**

![Deploy Button](/assets/installation/cpanel/21-deploy-button.png)

---

The installer will now configure your system automatically.

### 7.1 Deployment Steps

The installer performs these operations:
1. ✅ Validating system requirements
2. ✅ Creating environment configuration
3. ✅ Running database migrations
4. ✅ Seeding initial data
5. ✅ Setting up file permissions
6. ✅ Configuring application settings
7. ✅ Creating admin account

::: warning Do Not Close Browser
**Wait for the process to complete.** Do not:
- Close the browser tab
- Click the back button
- Navigate away from the page
- Refresh the page

The process typically takes 2-5 minutes.
:::

### 7.2 Installation Complete

When finished, you'll see a success message with:
- Confirmation that installation completed successfully
- Redirect to admin login page

---

## Step 8: Access Admin Panel

### 8.1 First Login

1. Click the admin login link (usually `https://pay.yourdomain.com/admin`)
2. Enter your admin email and password
3. Click **Login**

### 8.2 Welcome Dashboard

Upon first login, you'll see the UddoktaPay dashboard with setup reminders.

::: tip First Login Checklist
✅ Change admin password if needed  
✅ Validate license key  
✅ Configure cron job  
✅ Set up SSL certificate  
✅ Configure brand settings  
✅ Test payment gateway  
:::

---

## Post-Installation Configuration

Complete these essential configurations to make your payment gateway operational.

### 1. Validate License (Critical)

**Priority:** 🔴 **Must Complete Immediately**

1. Navigate to **Administration → License**
2. Click **Validate License**
3. Enter your license key from [my.uddoktapay.com](https://my.uddoktapay.com)
4. Click **Submit**
5. Verify activation success message

::: danger
UddoktaPay will not function without a valid license. Complete this step before any other configuration.
:::

### 2. Configure Cron Job (Critical)

**Priority:** 🔴 **Must Complete Immediately**

Cron jobs handle background tasks like transaction processing, notifications, and scheduled operations.

#### 2.1 Get Cron Command

1. In UddoktaPay admin, go to **System Settings → Cron Job**
2. Copy the cron command displayed (it will look like):
   ```
   * * * * * cd /home/username/public_html/pay.example.com && php artisan schedule:run >> /dev/null 2>&1
   ```

#### 2.2 Add Cron Job in cPanel

1. Return to cPanel home
2. Navigate to **Advanced** section
3. Click **Cron Jobs**
4. Under **Add New Cron Job**:
   - **Common Settings:** Select "Every Minute (****)"
   - Or manually enter: `* * * * *`
   - **Command:** Paste the command you copied
5. Click **Add New Cron Job**

#### 2.3 Verify Cron Job

- The cron job should appear in the list below
- Status should show as active
- First run will occur within 1 minute

**Detailed Guide:** [Complete Cron Job Setup →](/system-settings/cron-job)


### 3. Configure Brand Settings

**Priority:** 🟡 **Important Before Going Live**

Set up your payment gateway branding and business information.

**Configuration includes:**
- Business name and logo
- Contact information
- Payment methods
- Gateway credentials
- Email templates
- Notification settings

**Complete Guide:** [Brand Settings Configuration →](/brand-settings/overview)

### 4. Set Up Email Configuration (Recommended)

Configure SMTP for transactional emails (receipts, notifications, password resets).

1. Go to **Brand Settings → Mail Settings**
2. Choose SMTP provider (Gmail, SendGrid, Mailgun, etc.)
3. Enter SMTP credentials
4. Send test email to verify configuration

---

## Troubleshooting Guide

### Common Issues and Solutions

#### ❌ Blank Page or White Screen

**Problem:** Subdomain shows blank page after accessing.

**Solutions:**
1. Verify files were extracted to the correct directory
2. Check if `.htaccess` file exists in the root folder
3. Confirm PHP version is 8.2 or higher
   - cPanel → Software → MultiPHP Manager
4. Review error logs:
   - cPanel → Metrics → Errors
5. Check file permissions:
   - Folders: `755`
   - Files: `644`

#### ❌ Database Connection Failed

**Problem:** Installer cannot connect to database.

**Solutions:**
1. **Verify credentials are exactly correct:**
   - Check for copy-paste errors
   - Ensure no extra spaces
   - Confirm username includes cPanel prefix
2. **Try alternative host:**
   - If using `localhost`, try `127.0.0.1`
   - If using `127.0.0.1`, try `localhost`
3. **Verify database exists:**
   - cPanel → Databases → phpMyAdmin
   - Check database appears in left sidebar
4. **Confirm user has permissions:**
   - cPanel → Databases → MySQL Databases
   - Scroll to "Current Databases"
   - Verify user is assigned with ALL PRIVILEGES

#### ❌ Missing PHP Extensions

**Problem:** Installer reports missing or disabled extensions.

**Solutions:**
1. **Enable via Select PHP Version:**
   - cPanel → Software → Select PHP Version
   - Check boxes for missing extensions:
     - IonCube Loader
     - mbstring
     - pdo_mysql
     - openssl
     - tokenizer
     - json
     - bcmath
     - ctype
     - fileinfo
     - xml
   - Click **Save**
   - Refresh installer page
2. **If extensions are unavailable:**
   - Contact hosting provider
   - Request PHP 8.2+ with IonCube Loader
   - Some shared hosting may not support all extensions

#### ❌ 500 Internal Server Error

**Problem:** Server error when accessing subdomain.

**Solutions:**
1. **Check `.htaccess` file:**
   - Ensure file exists in subdomain root
   - Verify it's not corrupted
   - Try renaming it temporarily to test
2. **Review error logs:**
   - cPanel → Metrics → Errors
   - Look for specific error messages
3. **Verify PHP version:**
   - Must be PHP 8.2+
   - cPanel → Software → MultiPHP Manager
4. **Check file permissions:**
   - Root directory: `755`
   - Files: `644`
   - `storage` folder: `775`
   - `bootstrap/cache` folder: `775`

#### ❌ Permission Denied Errors

**Problem:** File permission errors during installation.

**Solutions:**
1. **In File Manager, select subdomain folder**
2. **Right-click → Change Permissions**
3. **Set correct permissions:**
   - **Directories:** `755` (rwxr-xr-x)
   - **Files:** `644` (rw-r--r--)
   - **storage folder:** `775` (rwxrwxr-x)
   - **bootstrap/cache folder:** `775` (rwxrwxr-x)
4. **Apply recursively if needed**

#### ❌ Can't Access Admin Panel (404 Error)

**Problem:** Admin URL returns 404 Not Found error.

**Solutions:**
1. **Verify `.htaccess` exists:**
   - File Manager → Show hidden files
   - Check for `.htaccess` in root
2. **Check mod_rewrite is enabled:**
   - Contact hosting provider if needed
3. **Try alternative URLs:**
   - `/admin` instead of direct access
   - `/public/admin` if installation used public folder
4. **Verify installation completed:**
   - Check installation logs
   - Look for completion confirmation
5. **Review error logs for specifics**

#### ❌ Installation Freezes or Times Out

**Problem:** Installation hangs during deployment phase.

**Solutions:**
1. **Increase PHP limits (via cPanel or hosting provider):**
   - `max_execution_time`: 300+ seconds
   - `memory_limit`: 512M or higher
   - `post_max_size`: 64M
   - `upload_max_filesize`: 64M
2. **Try during off-peak hours:**
   - Server load may be high
   - Late night/early morning often better
3. **Contact hosting provider:**
   - Request temporary limit increases
   - Ask about server resource availability
4. **Check disk space:**
   - Ensure adequate free space available
   - cPanel → Files → Disk Usage

#### ❌ Cron Job Not Running

**Problem:** Scheduled tasks not executing.

**Solutions:**
1. **Verify cron command is correct:**
   - Check for typos
   - Ensure path is absolute, not relative
2. **Check cron email for errors:**
   - cPanel may email cron output
   - Review error messages
3. **Test command manually via SSH:**
   - If you have SSH access
   - Run command to see immediate output
4. **Verify file permissions:**
   - `artisan` file should be executable

---

## Getting Help

If you encounter issues not covered in this guide:

### Before Contacting Support

**Gather this information:**
1. ✅ Your cPanel version (visible at bottom of cPanel home)
2. ✅ PHP version (Software → MultiPHP Manager)
3. ✅ Exact error messages (copy full text)
4. ✅ Screenshots of the issue
5. ✅ Steps you've already tried
6. ✅ Error logs (cPanel → Metrics → Errors)

### Support Resources

1. **Documentation:** Review complete [System Requirements](/system-requirements.md)
2. **Error Logs:** Check cPanel error logs for specific issues
3. **Support Portal:** Visit [my.uddoktapay.com](https://my.uddoktapay.com)
4. **Contact Support:** Submit ticket with gathered information above

::: tip Faster Resolution
Providing detailed information (error messages, screenshots, steps tried) helps support resolve issues much faster!
:::

---

## Next Steps After Installation

### Immediate Actions

1. ✅ **Validate License** → Administration → License
2. ✅ **Configure Cron Job** → System Settings → Cron Job
3. ✅ **Change Admin Password** → Profile → Security
4. ✅ **Configure Brand Settings** → Settings → Brand

### Before Going Live

1. ✅ **Test Payment Methods** → Process test transactions
2. ✅ **Configure Email Settings** → Brand Settings → Mail Settings

### Recommended Reading

- [Getting Started Guide](/getting-started)
- [Brand Settings Configuration](/brand-settings/overview)
- [Payment Gateway Setup](/payment-gateways)
- [API Documentation](/api/introduction)
- [Security Best Practices](/security)

---

## Installation Checklist

Use this checklist to track your progress:

### Pre-Installation
- [ ] Verified PHP 8.2+ with IonCube Loader
- [ ] Downloaded installer from my.uddoktapay.com
- [ ] Have license key ready

### Installation Steps
- [ ] Created subdomain in cPanel
- [ ] Uploaded installer file
- [ ] Extracted installer files
- [ ] Created database using Database Wizard
- [ ] Noted database credentials
- [ ] Configured database connection
- [ ] Created admin account
- [ ] Completed deployment

### Post-Installation
- [ ] Validated license key
- [ ] Configured cron job
- [ ] Enabled SSL certificate
- [ ] Configured brand settings
- [ ] Set up email SMTP
- [ ] Enabled automatic backups
- [ ] Tested payment processing
- [ ] Changed default admin password

---

**Installation Complete!** 🎉

Your UddoktaPay payment gateway is now ready for configuration and testing. Follow the [Getting Started Guide](/) to complete your setup.