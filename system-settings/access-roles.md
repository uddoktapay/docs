---
title: Access Roles
---

# Access Roles

- [Introduction](#introduction)
- [Create Access Role](#create-access-role)
  - [Role Details](#role-details)
  - [Permission Types](#permission-types)
  - [Resources](#resources)
  - [Pages](#pages)
  - [Widgets](#widgets)
- [Edit Access Role](#edit-access-role)
- [Delete Access Role](#delete-access-role)
- [Best Practices](#best-practices)

## Introduction

Access Roles define fine-grained permissions that control what staff members can view and modify in the UddoktaPay panel. Create roles for different positions (Finance, Support, Sales) and assign them to staff.

Access Access Roles from **Administration → System Settings → Access Roles**.

::: warning
**Requires Role Management Addon**  
This feature is only available if you have the Role Management addon installed and activated. Check **Administration → License** to view your available addons.
:::

## Create Access Role

Click **New Access Roles** to define a new permission set.

### Role Details

**Name** (required)  
Descriptive name for this role.

- Examples: Editor, Finance Manager, Support Agent, Sales Team
- Appears when assigning roles to staff
- Use clear, position-based names

### Permission Types

Permissions are organized into three tabs:

**Resources**  
Core data operations like viewing, creating, editing, and deleting records.

- Payments, Customers, Invoices, Gateways
- CRUD operations (Create, Read, Update, Delete)
- Most granular permission level

**Pages**  
Access to specific settings and configuration pages.

- Brand Settings pages
- System Settings pages
- Configuration areas

**Widgets**  
Dashboard widget visibility.

- Stats Overview, Payment Chart
- Gateway Chart, Latest Payments
- Controls what users see on dashboard

### Resources

Resource permissions control access to data and operations.

**Permission structure:**  
Each resource has multiple operations:
- **View** — See the resource (e.g., View Any Payment)
- **Create** — Add new records (e.g., Create Payment)
- **Update** — Modify existing records (e.g., Update Payment)
- **Delete** — Remove records (e.g., Delete Payment)
- **Restore** — Recover deleted records (if applicable)
- **Force Delete** — Permanently remove (if applicable)

**Available resource categories include:**

- Action
- API Key
- Bank Gateway
- Brand
- Customer
- Device
- FAQ
- Gateway
- Invoice
- Liquid
- SMS Data
- Notification Channel
- Order Box
- Payment Link
- Payment
- Access Roles
- Staffs
- Text File

::: tip
Grant only the permissions needed for each role. For example, Support team needs "View Payment" and "Update Payment" but probably not "Delete Payment".
:::

### Pages

Page permissions control access to settings and configuration screens.

**Available pages include:**

**Brand Settings:**
- View Brand Settings
- View Customize Theme
- View General Settings
- View Logo Settings
- View Mail Settings
- View Seo Settings
- View Themes

**System Settings:**
- View Dashboard
- View License
- View Reports
- View System Settings
- View System Cron Job
- View System General Settings
- View System Update

::: warning
"View System Settings" is required for users to access any System Settings pages. Grant this carefully as it affects system-wide configuration.
:::

### Widgets

Widget permissions control dashboard visibility.

**Available widgets:**
- **View Stats Overview** — Dashboard statistics cards
- **View Payment Chart** — Payment trends graph
- **View Gateway Chart** — Gateway usage chart
- **View Latest Payments** — Recent payments table

::: tip
Hiding widgets doesn't restrict underlying data access. Even without "View Payment Chart", users with "View Payment" can still see payment details.
:::

## Edit Access Role

Click **Edit** from the actions menu to modify an existing role.

**Editable fields:**
- Role name
- All permission checkboxes across Resources, Pages, and Widgets

::: warning
Changing permissions affects all staff assigned to this role immediately. Staff may gain or lose access to features without logging out.
:::

## Delete Access Role

Click **Delete** from the actions menu to remove a role.

**What happens:**
- Role is permanently deleted
- Staff assigned to this role lose those permissions
- If staff only had this role, they may lose all access
- Cannot be undone

::: danger
Deleting a role immediately affects all staff assigned to it. Ensure staff have other roles assigned or they may lose access to the panel entirely.
:::

## Best Practices

**Role design:**
- Create roles based on job functions, not individuals
- Use descriptive names (Finance Manager, not "John's Role")
- Start with minimal permissions, add as needed
- Document what each role is intended for

**Common role examples:**

**Finance Manager:**
- Resources: View/Update Payment, View Invoice, View Customer
- Pages: View Dashboard, View Reports
- Widgets: All

**Support Agent:**
- Resources: View Payment, View/Update Customer, View Invoice
- Pages: View Dashboard
- Widgets: View Latest Payments

**Sales Team:**
- Resources: View/Create Customer, View/Create Payment Link
- Pages: View Dashboard
- Widgets: View Stats Overview, View Latest Payments

**Operations:**
- Resources: View/Update/Approve Payment, View Gateway, View SMS Data
- Pages: View Dashboard, View System Cron Job
- Widgets: All

**Permission strategy:**
- View permissions are safer than Create/Update/Delete
- Separate read and write access when possible
- Delete permissions should be restricted
- System Settings access only for senior staff

**Maintenance:**
- Review role permissions quarterly
- Remove unused roles
- Audit staff assignments regularly
- Update permissions when job responsibilities change
- Test new roles with test accounts before assigning

**Security:**
- Principle of least privilege (minimum required access)
- Avoid creating "super admin" roles for everyone
- Separate financial operations from general access
- Restrict deletion and system settings permissions
- Monitor activity logs for assigned roles

**Organization:**
- Limit to 5-10 well-defined roles
- Avoid per-person custom roles
- Use consistent naming convention
- Document role purposes
- Keep permission sets logical and coherent

## Troubleshooting

**Can't create roles - "Role Management addon required"**

Problem: New Access Roles button disabled.

**Solution:**
1. Check **Administration → License**
2. Verify Role Management addon listed
3. Purchase at [my.uddoktapay.com](https://my.uddoktapay.com) if needed
4. Click **Refresh License** after purchasing

**Staff can't see features despite role assignment**

Problem: Staff has role but missing access.

**Solution:**
1. Edit the role
2. Verify required permissions are checked
3. For page access, check both resource AND page permissions
4. Save changes
5. Ask staff to logout and login

**Too many permissions to manage**

Problem: Overwhelming number of checkboxes.

**Solution:**
- Use search to filter permissions
- Use "Select all" then uncheck unwanted items
- Create base roles, then duplicate and modify
- Focus on commonly-needed permissions first

**Role deleted accidentally**

Problem: Removed wrong role.

**Solution:**
- Roles cannot be recovered after deletion
- Recreate role from scratch
- Check staff assignments immediately
- Reassign affected staff to appropriate roles

**Permission changes don't take effect**

Problem: Updated role but staff still has old access.

**Solution:**
1. Verify changes were saved
2. Ask staff to logout completely
3. Clear browser cache
4. Login again
5. If persists, check staff is assigned to correct role

::: tip
Create a "View Only" base role with all View permissions, then duplicate it and add Create/Update/Delete permissions for specific roles. This saves time and ensures consistency.
:::