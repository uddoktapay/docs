---
title: Staff Management
---

# Staff Management

- [Introduction](#introduction)
- [Create Staff](#create-staff)
- [Edit Staff](#edit-staff)
- [Delete Staff](#delete-staff)

## Introduction

Staff Management allows you to create and manage admin users who can access the UddoktaPay panel. Assign roles and brands to control what each staff member can access and modify.

Access Staff Management from **Administration → System Settings → Staffs**.

::: warning
**Requires Role Management Addon**  
This feature is only available if you have the Role Management addon installed and activated. Check **Administration → License** to view your available addons.
:::

## Create Staff

Click **New Staffs** to add a new admin user.

### Staff Information

**Name** (required)  
Full name of the staff member.

- Used for identification in admin panel
- Visible in activity logs and notifications

**Email** (required)  
Email address for login and notifications.

- Must be unique across all staff
- Used as login username
- Receives system notifications

**Phone** (required)  
Contact phone number.

- Format: Include country code if applicable
- Used for contact purposes
- Not used for login

**Password** (required)  
Initial password for staff login.

- Staff can change password after first login
- Use strong password with mixed characters
- Minimum length requirements may apply

### Access Control

**Roles** (required dropdown)  
Assign one or more roles to define permissions.

- Select from available roles (created in Access Roles)
- Multiple roles can be assigned
- Permissions combine from all assigned roles
- Placeholder: "Select an option"

**Brands** (required dropdown)  
Assign accessible brands to this staff member.

- Select which brands staff can manage
- Multiple brands can be assigned
- Staff only sees assigned brands
- Placeholder: "Select an option"

::: tip
Create roles in **System Settings → Access Roles** before creating staff. Each role defines specific permissions like viewing payments, managing gateways, etc.
:::


## Edit Staff

Click **Edit** from the actions menu to modify an existing staff member.

**Editable fields:**
- Name
- Email (cannot be changed if already verified)
- Phone
- Password (leave blank to keep current password)
- Roles
- Brands


::: warning
Changing a staff member's roles or brands immediately affects their access. They may lose access to certain features or brands upon save.
:::

## Delete Staff

Click **Delete** from the actions menu to remove a staff member.

**What happens:**
- Staff member loses all panel access immediately
- Login credentials become invalid
- Associated activity logs remain for audit purposes
- Cannot be undone

::: danger
Deleting a staff member is permanent. Their login access is immediately revoked. Ensure you want to remove this user before confirming deletion.
:::

## Best Practices

**Creating staff:**
- Use work email addresses, not personal
- Assign minimum required roles (principle of least privilege)
- Only grant brand access they need to manage
- Set strong initial passwords
- Document each staff member's responsibilities

**Role assignment:**
- Create specific roles for common positions (Sales, Support, Finance)
- Avoid giving all permissions unless necessary
- Review role permissions regularly
- Use multiple specific roles instead of one super-admin role

**Brand access:**
- Grant access only to brands they manage
- Review brand assignments quarterly
- Remove brand access when responsibilities change
- Document which staff manages which brands

**Security:**
- Change passwords if staff leaves organization
- Delete staff accounts for departed employees
- Review active staff list monthly
- Monitor staff activity in logs
- Use strong password requirements

**Organization:**
- Use consistent naming convention
- Keep phone numbers updated
- Verify email addresses are monitored
- Document emergency contacts

## Troubleshooting

**Can't create staff - "Role Management addon required"**

Problem: New Staffs button disabled or feature unavailable.

**Solution:**
1. Check **Administration → License**
2. Verify Role Management addon is listed
3. If not available, purchase at [my.uddoktapay.com](https://my.uddoktapay.com)
4. Click **Refresh License** after purchasing
5. Return to Staff Management

**No roles available in dropdown**

Problem: Roles dropdown is empty.

**Solution:**
1. Go to **System Settings → Access Roles**
2. Create at least one role with permissions
3. Return to Staff Management
4. Roles dropdown now populated

**Email already exists**

Problem: Can't create staff with duplicate email.

**Solution:**
- Use a different email address
- Check if staff already exists in list
- Use email aliases if same person needs multiple accounts
- Contact existing staff to recover account

**Staff can't login after creation**

Problem: New staff reports login failure.

**Solution:**
1. Verify email address is correct
2. Confirm password was communicated securely
3. Check staff account is not deleted
4. Ensure at least one role is assigned
5. Verify at least one brand is assigned
6. Check staff email for activation link (if required)

**Staff sees "No access" after login**

Problem: Staff can login but sees no data.

**Solution:**
1. Edit staff member
2. Verify roles are assigned
3. Confirm brands are assigned
4. Check assigned roles have actual permissions
5. Save changes
6. Ask staff to logout and login again