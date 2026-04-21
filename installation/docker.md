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

The installer will interactively prompt you for:
- **Domain / URL** — your application URL (default: `http://localhost`)
- **Port** — the port to expose (default: `80`)
- **Database** — local (Docker-managed) or remote (external MySQL/MariaDB)

::: details System Requirements

| Requirement | Specification |
|------------|---------------|
| **OS** | Linux (Ubuntu, Debian, CentOS, Fedora, etc.) |
| **RAM** | 1GB minimum |
| **Disk** | 10GB available |
| **Port** | 80 available (configurable) |
| **Access** | Root or sudo |
:::

::: details What gets installed?
- Docker (if not already installed)
- UddoktaPay application container
- MariaDB database container (if local DB chosen)
- All required dependencies
:::

::: tip Access Your Fresh Installation
**Immediately change the default credentials** after your first login.

- **Admin URL**: `https://YOUR_DOMAIN/admin`
- **Default Email**: `admin@admin.com`
- **Default Password**: `12345678`

> ⚠️ Do not use the default credentials in production!
:::

## Uninstall

```bash
curl -fsSL https://get.uddoktapay.com/uninstall.sh | bash
```

::: warning Data Backup
The uninstall script will prompt before deleting your data. Make sure you have backups if needed.
:::

## Common Commands

```bash
# View logs
docker compose -f /opt/uddoktapay/compose.yml logs -f

# Restart all services
docker compose -f /opt/uddoktapay/compose.yml restart

# Stop all services
docker compose -f /opt/uddoktapay/compose.yml down

# Start all services
docker compose -f /opt/uddoktapay/compose.yml up -d

# Access app shell
docker exec -it uddoktapay-app bash
```

## Manual Configuration

Need full control? Use Docker Compose directly instead of the automated installer.

### 1. Create the install directory

```bash
mkdir -p /opt/uddoktapay && cd /opt/uddoktapay
```

### 2. Download the compose file

```bash
curl -fsSL https://get.uddoktapay.com/compose.yml -o compose.yml
```

### 3. Generate your `APP_KEY`

Click the button below to generate a secure application key:

<div style="margin: 1rem 0; padding: 1rem; border: 1px solid var(--vp-c-divider); border-radius: 8px;">
  <button @click="generateKey" style="padding: 0.5rem 1rem; background: var(--vp-c-brand-1); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">Generate Key</button>
  <div v-if="appKey" style="margin-top: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
    <code style="flex: 1; padding: 0.5rem; background: var(--vp-c-bg-soft); border-radius: 4px; word-break: break-all;">{{ appKey }}</code>
    <button @click="copyKey" style="padding: 0.5rem 0.75rem; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); border-radius: 6px; cursor: pointer;">{{ copied ? '✓' : 'Copy' }}</button>
  </div>
</div>

<script setup>
import { ref } from 'vue'

const appKey = ref('')
const copied = ref(false)

function generateKey() {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  const base64 = btoa(String.fromCharCode(...array))
  appKey.value = `base64:${base64}`
  copied.value = false
}

function copyKey() {
  navigator.clipboard.writeText(appKey.value)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}
</script>

Or generate via terminal:
```bash
echo "base64:$(openssl rand -base64 32)"
```

### 4. Create your `.env` file

#### Local Database (recommended)

```env
PORT=80
APP_NAME=UddoktaPay
APP_ENV=production
APP_DEBUG=false
APP_URL=https://pay.yourdomain.com
APP_KEY=your-generated-key-here

# Database
DB_CONNECTION=mariadb
DB_HOST=mariadb
DB_PORT=3306
DB_DATABASE=uddoktapay
DB_USERNAME=uddoktapay
DB_PASSWORD=your-secure-password

# MariaDB container
MARIADB_DATABASE=uddoktapay
MARIADB_USER=uddoktapay
MARIADB_PASSWORD=your-secure-password
MARIADB_RANDOM_ROOT_PASSWORD=1

# Enable local database
COMPOSE_PROFILES=local-db
```

> **Important:** `DB_PASSWORD` and `MARIADB_PASSWORD` must be the same value.

#### Remote Database

```env
PORT=80
APP_NAME=UddoktaPay
APP_ENV=production
APP_DEBUG=false
APP_URL=https://pay.yourdomain.com
APP_KEY=

# Remote database
DB_CONNECTION=mariadb
DB_HOST=your-database-host.com
DB_PORT=3306
DB_DATABASE=uddoktapay
DB_USERNAME=uddoktapay_user
DB_PASSWORD=your-db-password
```

> Without `COMPOSE_PROFILES=local-db`, only the app container starts — no MariaDB container.

### 5. Start the services

```bash
docker compose up -d
```

### 6. Verify

```bash
# Check services are running
docker compose ps

# Follow logs until "started successfully"
docker compose logs -f
```

## Environment Variables

### Application

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `80` | Host port to expose |
| `APP_URL` | `http://localhost` | Full application URL |
| `APP_NAME` | `UddoktaPay` | Application name |
| `APP_ENV` | `production` | Environment mode |
| `APP_DEBUG` | `false` | Debug mode |
| `APP_KEY` | — | Encryption key (generate above) |

### Database

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_CONNECTION` | `mariadb` | Database driver |
| `DB_HOST` | `mariadb` | Hostname (`mariadb` for local, your host for remote) |
| `DB_PORT` | `3306` | Database port |
| `DB_DATABASE` | `uddoktapay` | Database name |
| `DB_USERNAME` | `uddoktapay` | Database username |
| `DB_PASSWORD` | — | Database password |

### Compose

| Variable | Default | Description |
|----------|---------|-------------|
| `COMPOSE_PROFILES` | — | Set to `local-db` to start the MariaDB container |

## Troubleshooting

### Port Already in Use

```bash
# Check what's using your port
sudo lsof -i :80

# Stop the conflicting service
sudo systemctl stop apache2  # or nginx

# Or change PORT in your .env file and restart
docker compose -f /opt/uddoktapay/compose.yml up -d
```

### Container Won't Start

```bash
# Check logs for errors
docker compose -f /opt/uddoktapay/compose.yml logs

# Fix common permission issues
docker exec uddoktapay-app chmod -R 775 /var/www/html/storage
docker compose -f /opt/uddoktapay/compose.yml restart
```

### Application Not Accessible

```bash
# Verify containers are running
docker compose -f /opt/uddoktapay/compose.yml ps

# Check firewall
sudo ufw allow 80/tcp

# Test local access
curl http://localhost
```

### Database Connection Failed

**Local database:**
```bash
# Check MariaDB container health
docker inspect uddoktapay-db --format='{{.State.Health.Status}}'

# Restart services
docker compose -f /opt/uddoktapay/compose.yml restart

# Verify volumes exist
docker volume ls | grep uddoktapay
```

**Remote database:**
```bash
# Verify credentials
docker exec uddoktapay-app env | grep DB_

# Ensure your remote DB allows connections from the Docker host IP
```

## Next Steps

Your Docker installation is complete! Continue with the essential configuration steps:

**[Post-Installation Configuration →](/installation/post-installation)**
- Validate license (required immediately)
- Configure cron job (required immediately)
- Set up brand settings
- Configure email delivery