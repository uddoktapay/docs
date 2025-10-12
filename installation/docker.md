---
title: Installation Guide (Docker)
---

# Docker Installation Guide

- [Introduction](#introduction)
- [Automated Installation](#automated-installation)
- [Manual Docker Installation](#manual-docker-installation)
- [Environment Variables](#environment-variables)
- [Managing Your Installation](#managing-your-installation)
- [Troubleshooting](#troubleshooting)

## Introduction

Install UddoktaPay using Docker containers for a consistent, isolated environment across any platform.

**Installation options:**
- **Automated** — One-command setup (Linux only, installs Docker automatically)
- **Manual** — Full control for existing Docker users (All platforms)

**Time:** 5-10 minutes

## Automated Installation

### Requirements

**Linux only** (Ubuntu, Debian, CentOS, Fedora, etc.)
- 1GB RAM minimum (2GB recommended)
- 10GB disk space
- Port 80 available
- No Docker required (auto-installed)

### Quick Install

```bash
curl -fsSL https://get.uddoktapay.com/install.sh | bash
```

**Default settings:**
- Admin Email: `admin@admin.com`
- Admin Password: `12345678`

::: danger
Change default credentials immediately after first login!
:::

### Custom Installation

```bash
# Set your configuration
export PORT=80
export APP_URL="https://pay.yourdomain.com"
export ADMIN_EMAIL="admin@yourcompany.com"
export ADMIN_PASSWORD="YourSecurePassword123!"

# Install
curl -fsSL https://get.uddoktapay.com/install.sh | bash
```

**Available variables:**

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 80 | Application port |
| `APP_URL` | http://localhost | Full URL with protocol |
| `ADMIN_EMAIL` | admin@admin.com | Admin login email |
| `ADMIN_PASSWORD` | 12345678 | Admin password |
| `DB_HOST` | 127.0.0.1 | Database host (external DB) |
| `DB_PORT` | 3306 | Database port |
| `DB_DATABASE` | uddoktapay | Database name |
| `DB_USERNAME` | uddoktapay_user | Database username |
| `DB_PASSWORD` | auto-generated | Database password |

## Manual Docker Installation

### Requirements

**All platforms** (Linux, macOS, Windows with WSL2)
- Docker Engine 20.10+
- 2GB RAM minimum
- 10GB disk space

### Basic Installation

With embedded MariaDB database:

```bash
docker run -d \
  --name uddoktapay-app \
  --restart unless-stopped \
  -p 80:80 \
  -e APP_NAME="UddoktaPay" \
  -e APP_URL="http://localhost" \
  -e INSTALL_EMAIL="admin@admin.com" \
  -e INSTALL_PASSWORD="12345678" \
  -e DB_CONNECTION="mariadb" \
  -v uddoktapay-app-data:/var/www/html \
  -v uddoktapay-db-data:/var/lib/mysql \
  uddoktapay/uddoktapay:latest
```

### With External Database

Connect to existing MySQL/MariaDB:

```bash
docker run -d \
  --name uddoktapay-app \
  --restart unless-stopped \
  -p 80:80 \
  -e APP_NAME="UddoktaPay" \
  -e APP_URL="https://pay.example.com" \
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

### Access Application

1. Wait 1-2 minutes for initialization
2. Navigate to: `https://pay.example.com/admin` or your configured URL
3. Login with admin credentials

### Verify Installation

```bash
# Check container status
docker ps | grep uddoktapay

# View logs
docker logs --tail 50 uddoktapay-app
```

## Environment Variables

### Application Settings

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `APP_NAME` | No | UddoktaPay | Application name |
| `APP_URL` | Yes | http://localhost | Full URL (include http:// or https://) |

### Database Settings

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DB_CONNECTION` | No | mariadb | `mysql`, `mariadb`, or `pgsql` |
| `DB_HOST` | No | 127.0.0.1 | Database host |
| `DB_PORT` | No | 3306 | Database port |
| `DB_DATABASE` | No | uddoktapay | Database name |
| `DB_USERNAME` | No | uddoktapay_user | Database user |
| `DB_PASSWORD` | No | auto-generated | Database password |

### Admin Account

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `INSTALL_EMAIL` | Yes | admin@admin.com | Admin email |
| `INSTALL_PASSWORD` | Yes | 12345678 | Admin password |

## Managing Your Installation

### Upgrade

**Automated:**
```bash
curl -fsSL https://get.uddoktapay.com/upgrade.sh | bash
```

**Manual:**
```bash
docker pull uddoktapay/uddoktapay:latest
docker stop uddoktapay-app
docker rm uddoktapay-app
# Run your original docker run command
```

### Uninstall

**Automated:**
```bash
curl -fsSL https://get.uddoktapay.com/uninstall.sh | bash
```

**Manual:**
```bash
docker stop uddoktapay-app
docker rm uddoktapay-app
docker volume rm uddoktapay-app-data uddoktapay-db-data  # Deletes all data
```

### Common Commands

```bash
# Start/stop/restart
docker start uddoktapay-app
docker stop uddoktapay-app
docker restart uddoktapay-app

# View logs
docker logs -f uddoktapay-app

# Access shell
docker exec -it uddoktapay-app bash

# Run artisan commands
docker exec uddoktapay-app php artisan cache:clear
docker exec uddoktapay-app php artisan schedule:run
```

## Troubleshooting

### Port Already in Use

```bash
# Find what's using port 80
sudo lsof -i :80

# Use different port
docker run -p 8080:80 ...
# Access at: http://your-ip:8080
```

### Container Won't Start

```bash
# Check logs
docker logs uddoktapay-app

# Fix permissions
docker exec uddoktapay-app chmod -R 775 /var/www/html/storage
docker restart uddoktapay-app
```

### Database Connection Failed

**Embedded database:**
```bash
# Restart container
docker restart uddoktapay-app

# Check volume exists
docker volume ls | grep uddoktapay
```

**External database:**
```bash
# Test connection
docker exec uddoktapay-app ping -c 3 your-database-host

# Verify credentials
docker exec uddoktapay-app env | grep DB_
```

### Application Not Accessible

```bash
# Check container is running
docker ps | grep uddoktapay

# Test locally
curl http://localhost

# Check firewall
sudo ufw allow 80/tcp
```

### SSL/HTTPS Setup

Docker container serves HTTP. For HTTPS, use a reverse proxy:

**Nginx:**
```nginx
server {
    listen 443 ssl;
    server_name pay.yourdomain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Caddy (automatic SSL):**
```
pay.yourdomain.com {
    reverse_proxy localhost:80
}
```

### Reset Installation

```bash
# Stop and remove everything
docker stop uddoktapay-app
docker rm uddoktapay-app
docker volume rm uddoktapay-app-data uddoktapay-db-data

# Reinstall
curl -fsSL https://get.uddoktapay.com/install.sh | bash
```

### Get Help

```bash
# Collect logs
docker logs --tail 500 uddoktapay-app > logs.txt
docker inspect uddoktapay-app > inspect.txt
```

Contact support at [my.uddoktapay.com](https://my.uddoktapay.com) with logs attached.

---

**Next Steps:** [Post-Installation Configuration →](/installation/post-installation)