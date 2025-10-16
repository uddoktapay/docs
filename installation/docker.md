---
title: Docker Installation
aside: true
---
# Introduction

Install UddoktaPay with a single command. The automated installer is production-ready and handles everything for you.

## Install
Run this command on your Linux server:

```bash
curl -fsSL https://get.uddoktapay.com/install.sh | bash
```


::: details System Requirements

| Requirement | Specification |
|------------|---------------|
| **OS** | Linux (Ubuntu, Debian, CentOS, Fedora, etc.) |
| **RAM** | 1GB minimum |
| **Disk** | 10GB available |
| **Port** | 80 available |
| **Access** | Root or sudo |
:::

::: details What gets installed?
- Docker (if not already installed)
- UddoktaPay application
- MariaDB database
- All required dependencies
:::

::: tip Access Your Fresh Installation
Before proceeding, **immediately change the default credentials** for security reasons. Use a strong, unique password and consider enabling two-factor authentication.

- **Admin URL**: `https://YOUR_DOMAIN/admin`  
  *(Replace `YOUR_DOMAIN` with your actual domain.)*

- **Default Email**: `admin@admin.com`  
  *(Update this in your user settings after login.)*

- **Default Password**: `12345678`  
  *(Change this on first login—do not use in production!)*
:::


## Upgrade

Keep your installation up-to-date:

```bash
curl -fsSL https://get.uddoktapay.com/upgrade.sh | bash
```

::: tip Safe Upgrades
Your data is preserved during upgrades. The upgrade script handles everything automatically.
:::

## Uninstall

Remove UddoktaPay from your server:

```bash
curl -fsSL https://get.uddoktapay.com/uninstall.sh | bash
```

::: warning Data Backup
The uninstall script will prompt before deleting your data. Make sure you have backups if needed.
:::

## Common Commands

```bash
# View logs
docker logs -f uddoktapay-app

# Restart application
docker restart uddoktapay-app

# Stop application
docker stop uddoktapay-app

# Start application
docker start uddoktapay-app

# Access shell
docker exec -it uddoktapay-app bash
```

## Manual Configuration

Need to customize your installation? Use manual Docker installation for full control.

### When to Use Manual Install

- Change default port (80)
- Use external database
- Custom Docker network setup
- Non-Linux platforms (macOS, Windows WSL2)

### Basic Docker Install

```bash
docker run -d \
  --name uddoktapay-app \
  --restart unless-stopped \
  -p 80:80 \
  -e APP_URL="http://localhost" \
  -e INSTALL_EMAIL="admin@admin.com" \
  -e INSTALL_PASSWORD="12345678" \
  -v uddoktapay-app-data:/var/www/html \
  -v uddoktapay-db-data:/var/lib/mysql \
  uddoktapay/uddoktapay:latest
```

### Custom Port

Change the default port 80 to any port you need:

```bash
docker run -d \
  --name uddoktapay-app \
  --restart unless-stopped \
  -p 8080:80 \
  -e APP_URL="http://localhost:8080" \
  -e INSTALL_EMAIL="admin@admin.com" \
  -e INSTALL_PASSWORD="12345678" \
  -v uddoktapay-app-data:/var/www/html \
  -v uddoktapay-db-data:/var/lib/mysql \
  uddoktapay/uddoktapay:latest
```

Access at: `http://YOUR_SERVER_IP:8080/admin`

### External Database

Connect to an existing MySQL/MariaDB server:

```bash
docker run -d \
  --name uddoktapay-app \
  --restart unless-stopped \
  -p 80:80 \
  -e APP_URL="https://pay.yourdomain.com" \
  -e INSTALL_EMAIL="admin@example.com" \
  -e INSTALL_PASSWORD="SecurePassword123" \
  -e DB_CONNECTION="mysql" \
  -e DB_HOST="your-database-host.com" \
  -e DB_PORT="3306" \
  -e DB_DATABASE="uddoktapay" \
  -e DB_USERNAME="uddoktapay_user" \
  -e DB_PASSWORD="your-db-password" \
  -v uddoktapay-app-data:/var/www/html \
  uddoktapay/uddoktapay:latest
```

::: tip Database Requirements
Ensure your database server allows connections from the Docker container's IP address.
:::

## Environment Variables

::: warning Application Settings

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `APP_URL` | Yes | `http://localhost` | Full application URL |
| `INSTALL_EMAIL` | Yes | `admin@admin.com` | Admin email |
| `INSTALL_PASSWORD` | Yes | `12345678` | Admin password |
| `APP_NAME` | No | `UddoktaPay` | Application name |

:::

::: tip Database Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_CONNECTION` | `mariadb` | Database type: `mysql`, `mariadb`, `pgsql` |
| `DB_HOST` | `127.0.0.1` | Database hostname |
| `DB_PORT` | `3306` | Database port |
| `DB_DATABASE` | `uddoktapay` | Database name |
| `DB_USERNAME` | `uddoktapay_user` | Database username |
| `DB_PASSWORD` | *auto-generated* | Database password |

:::

## Troubleshooting

### Port Already in Use

If port 80 is already occupied:

```bash
# Check what's using port 80
sudo lsof -i :80

# Option 1: Stop the conflicting service
sudo systemctl stop apache2  # or nginx

# Option 2: Use a different port
docker run -p 8080:80 ...
```

### Container Won't Start

```bash
# Check logs for errors
docker logs uddoktapay-app

# Fix common permission issues
docker exec uddoktapay-app chmod -R 775 /var/www/html/storage
docker restart uddoktapay-app
```

### Application Not Accessible

```bash
# Verify container is running
docker ps | grep uddoktapay

# Check firewall
sudo ufw allow 80/tcp
sudo ufw status

# Test local access
curl http://localhost
```

### Database Connection Failed

**For embedded database:**
```bash
# Restart container
docker restart uddoktapay-app

# Check volumes exist
docker volume ls | grep uddoktapay
```

**For external database:**
```bash
# Test connection from container
docker exec uddoktapay-app ping -c 3 your-database-host

# Verify credentials
docker exec uddoktapay-app env | grep DB_
```


## Next Steps

Your Docker installation is complete! Continue with the essential configuration steps:

**[Post-Installation Configuration →](/installation/post-installation)**
   - Validate license (required immediately)
   - Configure cron job (required immediately)
   - Set up brand settings
   - Configure email delivery

---

**Installation Complete!**

Your UddoktaPay payment gateway is now installed on Docker. Continue to [Post-Installation Configuration →](/installation/post-installation) to complete the setup.