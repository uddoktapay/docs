---
title: Installation Troubleshooting
---

# Installation Troubleshooting Guide

- [Introduction](#introduction)
- [Common Installation Issues](#common-installation-issues)
  - [Blank page or white screen](#blank-page-or-white-screen)
  - [Database connection failed](#database-connection-failed)
  - [Missing PHP extensions](#missing-php-extensions)
  - [500 Internal Server Error](#500-internal-server-error)
  - [Permission denied errors](#permission-denied-errors)
  - [Cannot access admin panel (404 error)](#cannot-access-admin-panel-404-error)
  - [Installation freezes or times out](#installation-freezes-or-times-out)
- [Post-Installation Issues](#post-installation-issues)
  - [License validation fails](#license-validation-fails)
  - [Cron job not running](#cron-job-not-running)
  - [Email notifications not sending](#email-notifications-not-sending)
- [Getting Help](#getting-help)
- [Diagnostic Tools](#diagnostic-tools)

## Introduction

This guide provides solutions for common installation and configuration issues with UddoktaPay. Issues are organized by symptom with step-by-step resolution instructions.

**Before troubleshooting:**
- Verify all [system requirements](/system-requirements.md) are met
- Check that you followed installation steps in order
- Review error logs for specific error messages
- Try the issue in a different browser (some issues are browser-specific)

## Common Installation Issues

Solutions for problems encountered during the installation process.

### Blank Page or White Screen

**Symptoms:**
- Subdomain displays blank white page
- No error message shown
- Browser shows loading but nothing appears

**Solutions:**

**1. Verify file extraction**

Problem: Files not extracted correctly or to wrong location

- Navigate to File Manager
- Browse to your subdomain directory
- Verify `index.php` exists in the root folder
- Check that `installer` folder exists with files inside
- If files missing, re-extract installer ZIP file
- Ensure extraction path is correct subdomain folder

**2. Check .htaccess file**

Problem: Missing or corrupted .htaccess file

- In File Manager, enable "Show Hidden Files" option
- Look for `.htaccess` file in subdomain root
- If missing:
  - Check if it was accidentally deleted
  - Re-extract installer to restore file
- If present but causing issues:
  - Download a backup copy
  - Try renaming to `.htaccess.bak`
  - Test if page loads without it

**3. Confirm PHP version**

Problem: PHP version too old or not configured

- Log into control panel
- Navigate to PHP version selector
- Verify PHP 8.2 or higher is selected
- Change version if needed
- Wait 1-2 minutes for changes to apply
- Refresh installer page

**4. Review error logs**

Problem: Server errors preventing page load

- Access error logs
- Look for recent errors matching your subdomain
- Note error messages and line numbers
- Use error details to identify specific problem

**5. Check file permissions**

Problem: Incorrect file permissions blocking access

- In File Manager, select subdomain folder
- Right-click → Change Permissions
- Set proper permissions:
  - Directories: `755` (drwxr-xr-x)
  - Files: `644` (-rw-r--r--)
- Check "Recurse into subdirectories"
- Apply changes
- Refresh installer page

::: tip Browser Cache
Sometimes blank pages are caused by browser caching. Try:
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Open in incognito/private browsing mode
- Clear browser cache completely
- Try a different browser
:::

----

### Database Connection Failed

**Symptoms:**
- Error message: "Database connection failed"
- Error message: "Access denied for user"
- Error message: "Unknown database"

**Solutions:**

**1. Verify credential accuracy**

Problem: Incorrect database credentials entered

- Double-check database name:
  - ✅ Must include username prefix (e.g., `username_dbname`)
  - ❌ Common mistake: forgetting prefix
- Double-check username:
  - ✅ Must include username prefix (e.g., `username_dbuser`)
  - ❌ Common mistake: using just `dbuser`
- Verify password:
  - Check for copy-paste errors
  - Ensure no extra spaces at start or end
  - Verify capitalization is exact
  - Try typing manually instead of pasting

**2. Try alternative database host**

Problem: Server requires specific host format

- If currently using `localhost`:
  - Change to `127.0.0.1`
  - Click Test Connection
- If currently using `127.0.0.1`:
  - Change to `localhost`
  - Click Test Connection
- Some servers require one specific format
- If both fail, try `127.0.0.1:3306`

**3. Verify database exists**

Problem: Database wasn't created or was deleted

- Access phpMyAdmin
- Check left sidebar for database name
- If database missing:
  - Recreate using Database Wizard
  - Note new credentials
  - Update installer with new credentials

**4. Check MySQL service status**

Problem: MySQL service is down

- Contact hosting provider if previous steps fail
- MySQL service may be stopped or crashed
- Provider can restart MySQL service
- Check control panel for service status indicators

::: warning Database Port
Standard MySQL port is 3306. If your hosting uses a custom port, you must include it in the port field: `3307`
:::

----
### Missing PHP Extensions

**Symptoms:**
- Installer shows red warnings for extensions
- Error message: "Required extension not found"
- List of missing extensions displayed

**Solutions:**
- Contact hosting provider support
- Provide list of missing extensions
- Request PHP 8.2+ with IonCube Loader
- Ask provider to install missing extensions

**3. Verify IonCube Loader specifically**

Problem: IonCube Loader is special requirement

- IonCube Loader is **absolutely required**
- Not available on all shared hosting
- Some providers charge extra for IonCube
- May need to upgrade hosting plan
- Verify provider supports IonCube before purchasing

**4. Consider alternative hosting**

Problem: Current host cannot provide requirements

- If provider cannot enable IonCube Loader
- If provider cannot install required extensions
- Consider these UddoktaPay-compatible providers:
  - Providers with cPanel + IonCube support
  - VPS/Cloud servers with full control

::: danger IonCube Loader Required
IonCube Loader is absolutely essential for UddoktaPay. The software will not function without it. If your hosting provider cannot enable IonCube Loader, you must switch to a compatible hosting provider.
:::

----
### 500 Internal Server Error

**Symptoms:**
- HTTP 500 error page
- "Internal Server Error" message
- Server error in browser

**Solutions:**

**1. Check .htaccess configuration**

Problem: Corrupted or incompatible .htaccess

- In File Manager, enable "Show Hidden Files"
- Locate `.htaccess` in subdomain root
- Right-click → Edit (or Download for backup)
- Look for obvious syntax errors
- Try renaming to `.htaccess.bak` temporarily
- If error disappears, .htaccess has issues:
  - Compare with fresh installer .htaccess
  - Contact support for correct configuration

**2. Review detailed error logs**

Problem: Need specific error information

- Access error logs (see control panel docs)
- Look for errors matching your access time
- Note file names and line numbers mentioned
- Search error message online for solutions
- Common 500 errors:
  - PHP memory limit exceeded
  - PHP execution time exceeded
  - File permission errors
  - Missing required files

**3. Verify PHP version compatibility**

Problem: Using incompatible PHP version

- Navigate to PHP version selector
- Confirm PHP 8.2 or higher is active
- If using PHP 8.3 or 8.4, try PHP 8.2
- Some hosting environments have issues with newest PHP
- Wait for changes to apply
- Test after each version change

**4. Check file and directory permissions**

Problem: Incorrect permissions causing errors

- Select subdomain folder in File Manager
- Change Permissions for entire directory:
  - Root directory: `755`
  - All subdirectories: `755`
  - All files: `644`
  - Storage directory: `775`
  - Bootstrap/cache directory: `775`
- Apply recursively
- Test after changing permissions

**5. Increase PHP resource limits**

Problem: PHP limits too low for installation

**Via php.ini (if available):**
```ini
memory_limit = 512M
max_execution_time = 300
max_input_time = 300
post_max_size = 64M
upload_max_filesize = 64M
```

**Via .htaccess (if allowed):**
```apache
php_value memory_limit 512M
php_value max_execution_time 300
```

**Contact hosting provider if:**
- Cannot change PHP settings yourself
- Settings don't take effect
- Need higher limits than allowed

----
### Permission Denied Errors

**Symptoms:**
- Error message: "Permission denied"
- Error message: "Failed to open stream"
- Cannot write to file or directory

**Solutions:**

**1. Set correct file permissions**

Problem: Files or directories have wrong permissions

**Via File Manager:**
1. Select subdomain root folder
2. Right-click → Change Permissions
3. For the root directory and all subdirectories:
   - Set to `755` (rwxr-xr-x)
   - Check all three "Execute" boxes
   - Check "Read" boxes for all
   - Check "Write" only for owner
4. Apply recursively to all subdirectories
5. Click Change Permissions

**Specific directory requirements:**
- `storage/` directory: `775`
- `storage/app/`: `775`
- `storage/framework/`: `775`
- `storage/logs/`: `775`
- `bootstrap/cache/`: `775`

**2. Check directory ownership**

Problem: Directories owned by wrong user

**Via SSH (if available):**
```bash
# Change owner to web server user
chown -R www-data:www-data /path/to/subdomain

# Or use your specific user
chown -R username:username /path/to/subdomain

# Set correct permissions
find /path/to/subdomain -type d -exec chmod 755 {} \;
find /path/to/subdomain -type f -exec chmod 644 {} \;

# Special permissions for storage
chmod -R 775 /path/to/subdomain/storage
chmod -R 775 /path/to/subdomain/bootstrap/cache
```

**Via control panel:**
- Most shared hosting handles ownership automatically
- If issues persist, contact hosting support
- Request ownership be set to web server user

::: warning Permission Numbers
Permission numbers explained:
- `755` = rwxr-xr-x (owner can write, everyone can read/execute)
- `775` = rwxrwxr-x (owner and group can write, everyone can read/execute)
- `644` = rw-r--r-- (owner can write, everyone can only read)

Never set permissions to `777` as this is a security risk.
:::

----

### Cannot Access Admin Panel (404 Error)

**Symptoms:**
- Admin URL returns 404 Not Found
- URL seems correct but page doesn't load
- Redirect errors to admin panel

**Solutions:**

**1. Verify .htaccess exists**

Problem: Missing .htaccess file

- In File Manager, enable "Show Hidden Files"
- Check subdomain root for `.htaccess`
- If missing:
  - Installation may have failed
  - Re-run installation
  - Or manually create .htaccess from documentation

**2. Check mod_rewrite is enabled**

Problem: Apache mod_rewrite module disabled

- mod_rewrite is required for URL routing
- Usually enabled by default on most servers
- **To verify/enable:**
  - Contact hosting provider support
  - Request mod_rewrite be enabled
  - Most cPanel/shared hosting has this enabled

**3. Try alternative admin URLs**

Problem: Admin accessible via different URL structure

- Try these URL patterns:
  - `https://yourdomain.com/admin`
  - `https://yourdomain.com/public/admin`
- If one works, note which URL structure is correct
- May need to update configuration or .htaccess

**4. Verify installation completed**

Problem: Installation didn't finish successfully

- Check for completion message during install
- Look in database using phpMyAdmin:
  - Verify tables were created
  - Check for `users` table with admin record
- If incomplete:
  - Drop all UddoktaPay tables
  - Re-run complete installation
  - Don't skip any steps

**5. Clear cache and restart services**

Problem: Cached configuration causing issues

**Via SSH (if available):**
```bash
cd /path/to/subdomain
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

**Via control panel:**
- Restart PHP-FPM service
- Clear server cache if available
- Clear browser cache
- Try accessing again


----

### Installation Freezes or Times Out

**Symptoms:**
- Installation hangs at deployment step
- Browser shows loading indefinitely
- Connection timeout error
- Gateway timeout (504 error)

**Solutions:**

**1. Increase PHP execution limits**

Problem: Installation needs more time than allowed

**Via control panel PHP editor:**
- Navigate to PHP configuration
- Increase `max_execution_time` to 600 seconds
- Increase `max_input_time` to 600 seconds
- Save changes
- Retry installation

**2. Increase PHP memory limit**

Problem: Installation running out of memory

- Set `memory_limit` to 512M minimum
- Try 1024M if 512M insufficient
- Some hosting plans limit maximum memory
- May need to upgrade plan if limit too low

**3. Increase upload and POST limits**

Problem: Large installation package timing out

- Set `post_max_size` to 128M
- Set `upload_max_filesize` to 128M
- Ensures installer files can upload completely

**4. Try during off-peak hours**

Problem: Server overloaded at peak times

- Shared servers slow during high traffic
- Try installation at these times:
  - Late night (11 PM - 3 AM)
  - Early morning (4 AM - 7 AM)
  - Weekends (often less traffic)
- Server resources more available off-peak

## Post-Installation Issues

Solutions for problems after installation completes.

### License Validation Fails

**Symptoms:**
- Error: "Invalid license key"
- Error: "License key already in use"
- License validation returns error

**Solutions:**

**1. Verify license key accuracy**

Problem: License key entered incorrectly

- Copy license key directly from my.uddoktapay.com
- Ensure no extra spaces before/after key
- Check all characters copied correctly
- License keys are case-sensitive
- Try typing manually instead of pasting

**2. Check domain matches licensed domain**

Problem: License issued for different domain

- Licenses are typically tied to specific domain
- Verify installation domain matches licensed domain
- Check for www vs non-www differences
- Subdomain must match exactly if licensed for subdomain
- Contact support if need to change licensed domain

**3. Ensure license not already activated**

Problem: License already activated on another installation

- One license typically works on one domain
- If you have multiple installations:
  - Deactivate on old installation first
  - Then activate on new installation
- Or purchase additional licenses
- Contact support to transfer license

**4. Contact support for license issues**

If none of the above work:
- Visit my.uddoktapay.com
- Submit support ticket with:
  - Your license key
  - Domain you're installing on
  - Exact error message
  - Screenshots of error

---

### Cron Job Not Running

**Symptoms:**
- Scheduled tasks not executing
- Payments not processing automatically
- Email notifications delayed or not sending
- "Last Run" timestamp not updating

**Solutions:**

**1. Verify cron command accuracy**

Problem: Cron command has syntax errors

- Review cron command for typos:
  - Check timing: `* * * * *` (5 asterisks)
  - Verify path is absolute: `/home/user/...`
  - Check command: `php artisan schedule:run`
- Compare with command from UddoktaPay dashboard
- Even small typo will cause cron to fail

**2. Check cron execution logs**

Problem: Cron running but producing errors

**cPanel:**
- Check email for cron output
- cPanel sends email when cron produces output
- Look for error messages in email
- Email address is cPanel account email

**SSH access:**
```bash
# View cron logs
grep CRON /var/log/syslog

# View mail logs for cron emails
tail -f /var/mail/username
```

**3. Test command manually**

Problem: Need to verify command works

**Via SSH:**
```bash
# Navigate to installation directory
cd /path/to/subdomain

# Run schedule manually
php artisan schedule:run

# Check output for errors
```

- If command fails manually, it will fail in cron
- Error messages show what's wrong
- Fix errors then retry in cron

**4. Verify correct PHP path**

Problem: Wrong PHP binary path

Some servers require full PHP path:

```bash
# Try these path variations:
/usr/bin/php artisan schedule:run
/usr/local/bin/php artisan schedule:run
/opt/php82/bin/php artisan schedule:run

# Find correct PHP path:
which php
# Use the output path in cron command
```

**5. Check file permissions**

Problem: Cron cannot execute artisan file

```bash
# Verify artisan is readable
ls -la /path/to/subdomain/artisan

# If needed, make artisan executable
chmod +x /path/to/subdomain/artisan
```

**6. Verify timing is every minute**

Problem: Cron set to wrong frequency

- Cron MUST run every minute: `* * * * *`
- Common mistakes:
  - `0 * * * *` (runs every hour, not every minute)
  - `*/5 * * * *` (runs every 5 minutes)
  - `* * * * 0` (runs only on Sunday)
- Correct timing is exactly: `* * * * *`

::: warning Cron Email Spam
If cron sends too many emails:
1. Redirect output to /dev/null: `>> /dev/null 2>&1`
2. Or disable cron emails in cPanel settings
3. But keep emails enabled during setup for debugging
:::

---

### Email Notifications Not Sending

**Symptoms:**
- Payment receipts not received
- Welcome emails not sending
- Password reset emails not arriving
- Test emails fail

**Solutions:**

**1. Verify SMTP configuration**

Problem: SMTP settings incorrect

- Navigate to Brand Settings → Mail Settings
- Verify all SMTP settings:
  - ✅ Host address is correct
  - ✅ Port number is correct (usually 587 or 465)
  - ✅ Username is correct
  - ✅ Password is correct
  - ✅ Encryption matches port (TLS for 587, SSL for 465)

**Common SMTP settings:**

| Provider | Host | Port | Encryption |
|----------|------|------|------------|
| Gmail | smtp.gmail.com | 587 | TLS |
| SendGrid | smtp.sendgrid.net | 587 | TLS |
| Mailgun | smtp.mailgun.org | 587 | TLS |
| Amazon SES | email-smtp.region.amazonaws.com | 587 | TLS |

**2. Check sender email authentication**

Problem: Gmail blocks unsigned emails

**For Gmail SMTP:**
- Enable 2-factor authentication on Google account
- Create App Password (not regular password)
- Use App Password in SMTP settings
- Or enable "Less secure app access" (not recommended)

**3. Test email delivery**

Problem: Need to verify configuration works

- In Mail Settings, click "Send Test Email"
- Enter your email address
- Click Send
- Check inbox (and spam folder)
- If test email arrives, SMTP is configured correctly
- If not, review error message

**4. Check spam folder and filters**

Problem: Emails being marked as spam

- Check recipient spam folder
- Look for emails from your sender address
- If in spam:
  - Add sender to contacts
  - Mark as "Not Spam"
  - Configure SPF/DKIM/DMARC records
  - Use dedicated email service

**5. Verify firewall allows SMTP**

Problem: Server blocks outgoing SMTP

**Test SMTP connectivity:**
```bash
# Test connection to SMTP server
telnet smtp.gmail.com 587

# If connection refused:
# - Server firewall blocks SMTP
# - Contact hosting to allow SMTP
# - May need to use mail relay instead
```

**6. Review email logs**

Problem: Need detailed error information

**Via SSH:**
```bash
# Check Laravel logs
tail -f storage/logs/laravel.log | grep -i mail

# Look for SMTP errors
# Note specific error messages
```

**Via control panel:**
- Navigate to error logs
- Look for mail-related errors
- Check around time test email sent

::: tip Email Provider Limitations
- Gmail SMTP: 500 emails/day limit
- Free tier limits on SendGrid, Mailgun
- Consider paid email service for production
- Dedicated email services have better deliverability
:::

## Getting Help

If issues persist after trying these solutions, gather information and contact support.

### Before Contacting Support

Collect this information to expedite resolution:

**System Information:**
- ✅ Control panel type and version
- ✅ PHP version (check via control panel)
- ✅ MySQL/MariaDB version
- ✅ Server operating system (if known)
- ✅ Hosting provider name

**Installation Details:**
- ✅ Installation method used
- ✅ Which step you're on
- ✅ What you were doing when error occurred
- ✅ Whether this is fresh install or reinstall

**Error Information:**
- ✅ Exact error messages (copy complete text)
- ✅ Screenshots showing errors
- ✅ Error log entries (from control panel)
- ✅ Browser console errors (F12 → Console)
- ✅ Time when error occurred

**What You've Tried:**
- ✅ List of troubleshooting steps already attempted
- ✅ Results of each troubleshooting step
- ✅ Any changes made to resolve issue
- ✅ Whether issue persists after changes

### Support Resources

**Official Support:**
1. Visit [my.uddoktapay.com](https://my.uddoktapay.com)
2. Log into your account
3. Submit support ticket with information gathered above
4. Include license key for faster verification
5. Attach screenshots and log files

::: tip Response Time
Support responds faster when you provide:
- Complete system information
- Exact error messages
- Detailed description
- What you've already tried
- Relevant screenshots and logs

Incomplete information requires back-and-forth clarification, delaying resolution.
:::


## Diagnostic Tools

Tools to help identify and resolve issues.

### System Information Checker

Create a PHP file to check your server configuration:

**sysinfo.php:**
```php
<?php
phpinfo();
?>
```

Upload to subdomain root, access via browser, shows:
- PHP version and configuration
- Loaded extensions
- Memory and execution limits
- Server environment details

**Delete after use for security.**

### Database Connection Tester

Test database connectivity:

**dbtest.php:**
```php
<?php
$host = '127.0.0.1';
$dbname = 'your_database';
$username = 'your_username';
$password = 'your_password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    echo "Database connection successful!";
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
```

**Delete after use for security.**

### Permission Checker

Check file permissions via SSH:

```bash
# Check current permissions
ls -la /path/to/subdomain

# Find files with wrong permissions
find /path/to/subdomain -type f ! -perm 644

# Find directories with wrong permissions
find /path/to/subdomain -type d ! -perm 755
```

### Log Viewer

Quick log review:

```bash
# View last 50 lines of Laravel log
tail -50 /path/to/subdomain/storage/logs/laravel.log

# Watch log in real-time
tail -f /path/to/subdomain/storage/logs/laravel.log

# Search logs for specific errors
grep -i "error" /path/to/subdomain/storage/logs/laravel.log
```

---

**Still Having Issues?**

If you've tried everything in this guide and still experiencing problems, don't hesitate to [contact support](https://my.uddoktapay.com) with the information you've gathered. We're here to help!