---
title: System Requirements
---

# System Requirements

Before installing **UddoktaPay**, make sure your server meets the following requirements.

---

## Installer Requirements

These extensions are required only during the installation process:

- **curl** → Required for downloading the application archive.  
- **zip** → Required for extracting the application files.  
- **mbstring** → Required for multibyte string handling during setup.  
- **ionCube Loader** → Required to run encrypted UddoktaPay source code.

---

## PHP Requirements

- **PHP Version**: 8.2 or higher (8.3+ recommended).  
- **Web Server**: Nginx or Apache with HTTPS enabled.  
- **Database**: MySQL 8+ / MariaDB 10.6+, PostgreSQL or SQL Server.  
- **Redis**: Recommended for queues & caching.  
- **Supervisor / systemd**: Required for running background jobs.  

---

## Required PHP Extensions

| Extension   | Purpose |
|-------------|---------|
| ctype       | Character type checking |
| curl        | HTTP client functionality |
| dom         | XML DOM manipulation |
| fileinfo    | File type detection |
| filter      | Data filtering |
| hash        | Hashing functionality |
| mbstring    | Multibyte string handling |
| openssl     | Encryption and secure connections |
| pcre        | Regular expressions |
| pdo         | Database connectivity |
| session     | Session management |
| tokenizer   | PHP tokenization |
| xml         | XML processing |
| bcmath      | Arbitrary precision arithmetic |
| json        | JSON processing |
| intl        | Internationalization |
| gd          | Image processing |
| imagick     | Image processing (advanced) |
| pcntl       | Queue workers (process control) |
| exif        | Reading image metadata |
| sockets     | WebSocket functionality |
| sodium      | Modern cryptographic operations |
| gmp         | Arbitrary-precision arithmetic |

---

## Database Extensions

| Extension   | Purpose |
|-------------|---------|
| pdo_mysql   | MySQL / MariaDB database connections |
| pdo_pgsql   | PostgreSQL database connections |
| pdo_sqlsrv  | SQL Server database connections |

---

Make sure all the required PHP extensions are installed and enabled on your server before running the installation guide.