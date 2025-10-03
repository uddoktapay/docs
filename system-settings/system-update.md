---
title: System Update
---

# System Update

- [Introduction](#introduction)
- [Check for Updates](#check-for-updates)
- [Release Types](#release-types)
- [Install Update](#install-update)
- [Update Status](#update-status)
- [Stop Update](#stop-update)
- [Best Practices](#best-practices)

## Introduction

System Update manages UddoktaPay software updates. Check for new versions, review changelogs, select release channels, and apply updates to keep your installation current.

Access System Update from **Administration → System Settings → Update**.

## Check for Updates

Click **Check for Updates** to query the update server for new versions.

**What happens:**
1. System contacts update server
2. Compares current version with latest available
3. Displays update status

**Update available:**
- Update details display
- Version number shown
- Changelog available
- Install Update button becomes active

## Release Types

Click **Release Type** to choose your update channel.

### Available Release Types

**Stable** (recommended)  
Production-ready releases tested and verified.

**Pre-release**  
Early access to upcoming features before stable release.

**Beta**  
Cutting-edge features in active development.

### Change Release Type

1. Click **Release Type** button
2. Modal opens: "Choose release type"
3. Select: Stable, Pre-release, or Beta
4. Click **Save**
5. Click **Check for Updates** to see available versions

::: warning
Changing from Stable to Pre-release or Beta may offer updates with untested features. Only use Pre-release or Beta channels on development installations, never on production sites.
:::

## Install Update

When an update is available, click **Install Update** to begin installation.

**Before installation:**
- Backup your database
- Backup your files
- Note current version
- Inform users of potential downtime

**Installation process:**

1. Click **Install Update**
2. Progress bar appears showing update status
3. System downloads update files
4. Applies database migrations
5. Updates core files
6. Clears caches
7. Completes installation

**Progress indicators:**
- Percentage complete
- Current operation description

::: danger
**Do not close the browser or navigate away during update installation.** Interrupting the update process can corrupt your installation and require manual recovery.
:::

## Stop Update

If an update is in progress, a **Stop Update** button appears.

**To stop an update:**

1. Click **Stop Update** button during installation
2. Confirmation prompt appears
3. Confirm to halt the process
4. Update stops at current step
5. System attempts to rollback changes

::: danger
**Stopping an update mid-process is risky.** Only use this if absolutely necessary (e.g., critical error detected). Stopped updates may leave your installation in an inconsistent state requiring manual intervention or restoration from backup.
:::

**After stopping:**
- Review error logs
- Check database integrity
- Verify file permissions
- Restore from backup if needed
- Contact support if installation damaged

## Best Practices

**Before updating:**
- **Backup everything** — Database and files
- **Read changelog** — Understand what's changing
- **Test on staging** — If you have a staging environment
- **Schedule maintenance** — Notify users of downtime
- **Check requirements** — PHP version, extensions, disk space

**During update:**
- Don't close browser
- Don't navigate away from