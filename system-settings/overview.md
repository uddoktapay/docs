---
title: System Settings
---

# System Settings

Configure application-wide technical settings that affect all brands in your UddoktaPay installation.

<div class="settings-grid">

<SettingsCard
  title="General"
  description="Manage essential system preferences including app name, environment, debug mode, and timezone."
  link="/system-settings/general"
/>

<SettingsCard
  title="Cron Job"
  description="Configure scheduler and queue workers, monitor heartbeat, and manage background tasks."
  link="/system-settings/cron-job"
/>

<SettingsCard
  title="Staff Management"
  description="Manage internal users, send invitations, control statuses, and organize your admin team."
  link="/system-settings/staff-management"
  badge="Addon Required"
/>

<SettingsCard
  title="Access Roles"
  description="Define roles and assign fine-grained permissions across the entire system."
  link="/system-settings/access-roles"
  badge="Addon Required"
/>

<SettingsCard
  title="Addons"
  description="Manage and configure installed addons to extend system functionality."
  link="/system-settings/addons"
/>

<SettingsCard
  title="System Update"
  description="Check for updates, review changelogs, and apply new versions to your installation."
  link="/system-settings/system-update"
/>

</div>

<style>
.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}
</style>


## System vs Brand Settings

**System Settings** apply globally to the entire installation and affect all brands:
- Technical infrastructure configuration
- User management and permissions
- Background jobs and scheduled tasks
- System updates and maintenance

**Brand Settings** apply to individual brands:
- Customer-facing customization
- Brand-specific logos and themes
- Per-brand notifications and emails
- Individual API configurations

## Quick Start

1. Configure **[General Settings](/system-settings/general)** with app name and timezone
2. Set up **[Cron Job](/system-settings/cron-job)** for background tasks
3. Manage **[Staff](/system-settings/staff-management)** and **[Roles](/system-settings/access-roles)** if using Role Management addon
4. Review **[Addons](/system-settings/addons)** for additional features
5. Monitor **[System Update](/system-settings/system-update)** for new releases

::: warning
System Settings require admin/system-level access and affect all brands. Most day-to-day operations use Brand Settings instead.
:::