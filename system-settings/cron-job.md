---
title: Cron Job
---

# Cron Job

- [Introduction](#introduction)
- [Last Cron Run](#last-cron-run)
- [Setup Instructions](#setup-instructions)
  - [Web Cron via cURL](#web-cron-via-curl)
  - [Full Path Command](#full-path-command)
- [Run Cron Manually](#run-cron-manually)
- [Troubleshooting](#troubleshooting)

## Introduction

Cron Job manages scheduled tasks and background job processing for your UddoktaPay installation. Notifications, queue processing, and automated tasks require a properly configured cron job.

Access Cron Job from **Administration → System Settings → Cron Job**.

::: warning
Without a configured cron job, notifications won't send, queued jobs won't process, and scheduled tasks won't run. Set this up immediately after installation.
:::

## Last Cron Run

Displays when the cron job last executed successfully.

**Status indicators:**
- **Never** — Cron job not configured or hasn't run yet
- **Date/Time** — Last successful execution timestamp

Check this status regularly to ensure your cron job is running correctly.

## Setup Instructions

Two methods are available for setting up the cron job. Choose the one that works best with your hosting environment.

### Web Cron via cURL

Use this method if your hosting control panel supports web cron (URL-based scheduling).

The Cron Job page displays a unique cURL command for your installation. 

**Setup in hosting control panel:**

1. Log into your hosting control panel (cPanel, Plesk, etc.)
2. Navigate to Cron Jobs section
3. Add new cron job
4. **Frequency:** Every minute (`* * * * *`)
5. **Command:** Copy the "Web Cron via cURL" command from the Cron Job page
6. Save

**Copy button:** Click the copy icon next to the command to copy it exactly.

### Full Path Command

Use this method for direct server access via SSH or advanced control panels.

The Cron Job page displays the complete command with your exact server paths.

**Setup via SSH:**

1. Connect to server via SSH
2. Open crontab editor: `crontab -e`
3. Add this line with your exact command from the Cron Job page:
```bash
* * * * * [your-full-path-command-here] >> /dev/null 2>&1
```
4. Save and exit

**Setup via control panel:**

1. Navigate to Cron Jobs
2. Add new cron job
3. **Frequency:** Every minute (`* * * * *`)
4. **Command:** Copy the "Full Path Command" from the Cron Job page
5. Save

::: tip
Always copy commands directly from the Cron Job page—they contain your unique installation paths and security tokens. Never use commands from tutorials or other installations.
:::

**Requirements:**
- PHP 8.2+ with IonCube Loader
- Correct PHP binary path
- Laravel artisan file accessible
- Write permissions to storage directory

## Run Cron Manually

Test cron execution without waiting for the scheduled run.

**To run manually:**

1. Click **Run Cron Manually**
2. System executes all pending scheduled tasks
3. "Last Cron Run" updates to current time
4. Check results or errors in output

**Use cases:**
- Test cron configuration
- Process pending queue jobs immediately
- Verify scheduled tasks execute correctly
- Trigger notifications without waiting

::: warning
Manual execution doesn't replace automated cron setup. It's only for testing and immediate processing.
:::

## Troubleshooting

**Last Cron Run shows "Never"**

Problem: Cron job never executed.

**Solution:**
1. Verify cron job added in hosting control panel
2. Check frequency is set to every minute (`* * * * *`)
3. Confirm command copied exactly from Cron Job page
4. Wait 1-2 minutes and refresh page
5. Click "Run Cron Manually" to test
6. Check server logs for errors

**Cron stopped running**

Problem: Last run time is old (hours/days ago).

**Solution:**
1. Check cron job still exists in control panel
2. Verify hosting account is active
3. Check PHP version supports PHP 8.2+
4. Ensure IonCube Loader is installed
5. Review server error logs
6. Test with "Run Cron Manually"

**Notifications not sending**

Problem: Cron runs but notifications don't send.

**Solution:**
1. Verify "Last Cron Run" updates every minute
2. Check queue configuration is correct
3. Verify notification channels enabled (Brand Settings → Notifications)
4. Check mail settings if using email notifications
5. Review notification channel logs

**Permission denied errors**

Problem: Cron fails with permission errors.

**Solution:**
1. Ensure PHP binary path is correct
2. Check artisan file is executable: `chmod +x artisan`
3. Verify web server user has write access to storage/
4. Check log file permissions in storage/logs/
5. Contact hosting support if permissions can't be changed

**Wrong PHP version**

Problem: Cron uses old PHP version.

**Solution:**
1. Use Full Path Command method
2. Verify the command points to PHP 8.2+ binary
3. Test PHP version: `/path/to/php -v`
4. Update cron command with correct PHP path
5. Ensure IonCube Loader enabled for that PHP version

**Command not found**

Problem: Server can't find PHP or artisan.

**Solution:**
1. Copy the exact Full Path Command from Cron Job page
2. Don't modify paths manually
3. Verify paths exist on server
4. Check file permissions
5. Contact hosting support for correct PHP path

::: tip
After configuring the cron job, wait 1-2 minutes and refresh the page. "Last Cron Run" should update to the current time. If it doesn't, review your cron configuration.
:::

## Best Practices

**Setup:**
- Configure cron job immediately after installation
- Always copy commands from Cron Job page
- Test with "Run Cron Manually" after setup
- Monitor "Last Cron Run" daily for first week

**Monitoring:**
- Check "Last Cron Run" updates every minute
- Set up alerts if cron stops running
- Review scheduled task logs regularly
- Monitor queue processing times

**Maintenance:**
- Recheck cron after server migrations
- Verify after hosting control panel updates
- Update if displayed commands change after updates
- Keep cron job settings backed up

**Performance:**
- Don't run cron more frequently than every minute
- Monitor server resources during cron execution
- Optimize long-running scheduled tasks
- Use queue for time-intensive operations