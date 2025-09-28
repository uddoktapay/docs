---
title: Installation Guide
---

# Installation Guide

This guide will help you install **UddoktaPay** on your server using the web-based installer.

---

## 1. Download Installer

- Log in to your [UddoktaPay Account Panel](https://my.uddoktapay.com).  
- Open your **Service Details** page.  
- Download the **Installer file** (`installer.zip`).  

---

## 2. Upload Installer

- Upload the installer file to the **domain or subdomain** where you want to host UddoktaPay.  
  - Example: `pay.example.com` or `uddoktapay.example.com`  
- Ensure the domain is correctly pointed to your server’s **public_html** or document root.  

---

## 3. Run Installer

1. Open the domain in your browser, e.g. `https://pay.example.com`.  
2. The installer wizard will guide you through the setup process.  

---

## 4. Provide Database Information

Enter the required database details:  

- **Database Host** (e.g. `127.0.0.1`)  
- **Database Name**  
- **Database Username**  
- **Database Password**  

⚠️ Make sure the database and user are already created and have the correct privileges.  

---

## 5. Create Admin Account

Enter details for your first administrator:  

- **Admin Email**  
- **Admin Password**  

This account will be used to log in to the dashboard after installation.  

---

## 6. Deploy UddoktaPay

- Click the **Deploy UddoktaPay** button.  
- The installer will:  
  - Validate system requirements.  
  - Configure the `.env` file.  
  - Run necessary migrations.  
  - Set up your initial system settings.  

---

## 7. Login

Once installation completes:  

- You will be redirected to the **login page**.  
- Use your **Admin Email & Password** to access the UddoktaPay dashboard.