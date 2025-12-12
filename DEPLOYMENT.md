# BMAD Workspace - Deployment Guide for Hetzner Server

## 📋 Prerequisites

- Hetzner VPS (Ubuntu 22.04 recommended)
- Domain pointed to your server IP (Netcup DNS)
- SSH access to your server

---

## 🚀 Option 1: Docker Deployment (Recommended)

### Step 1: Install Docker on Hetzner

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose-plugin -y

# Add your user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

### Step 2: Upload Project Files

```bash
# On your local machine, create a zip of the project
# Or use git to clone from your repository

# Create project directory on server
sudo mkdir -p /var/www/bmad-workspace
cd /var/www/bmad-workspace

# Upload files via SCP or SFTP
scp -r ./* user@your-server-ip:/var/www/bmad-workspace/
```

### Step 3: Build and Run with Docker

```bash
cd /var/www/bmad-workspace

# Build the Docker image
docker compose build

# Start the container
docker compose up -d

# Check if running
docker compose ps
docker compose logs -f
```

### Step 4: Setup Nginx & SSL

```bash
# Install Nginx
sudo apt install nginx -y

# Install Certbot for SSL
sudo apt install certbot python3-certbot-nginx -y

# Copy nginx config
sudo cp nginx/nginx.conf /etc/nginx/sites-available/bmad-workspace

# Edit the config - replace 'your-domain.com' with your actual domain
sudo nano /etc/nginx/sites-available/bmad-workspace

# Enable the site
sudo ln -s /etc/nginx/sites-available/bmad-workspace /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test nginx config
sudo nginx -t

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Restart nginx
sudo systemctl restart nginx
```

---

## 🔧 Option 2: PM2 Deployment (Without Docker)

### Step 1: Install Node.js

```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Yarn
sudo npm install -g yarn

# Install PM2
sudo npm install -g pm2
```

### Step 2: Setup Application

```bash
# Create directory
sudo mkdir -p /var/www/bmad-workspace
sudo chown -R $USER:$USER /var/www/bmad-workspace
cd /var/www/bmad-workspace

# Upload your files here

# Install dependencies
yarn install

# Build the application
yarn build

# Create log directory
sudo mkdir -p /var/log/bmad
sudo chown -R $USER:$USER /var/log/bmad
```

### Step 3: Start with PM2

```bash
# Start the application
pm2 start ecosystem.config.js --env production

# Save PM2 process list
pm2 save

# Setup PM2 to start on boot
pm2 startup systemd
# Follow the command it outputs
```

---

## 🌐 DNS Configuration (Netcup)

1. Log in to your Netcup Customer Control Panel
2. Go to **Domains** → Select your domain → **DNS**
3. Add/Update these records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | YOUR_HETZNER_IP | 300 |
| A | www | YOUR_HETZNER_IP | 300 |

4. Wait 5-15 minutes for DNS propagation

---

## 🔒 Firewall Configuration

```bash
# Install UFW if not installed
sudo apt install ufw -y

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## 📊 Useful Commands

### Docker
```bash
# View logs
docker compose logs -f bmad-app

# Restart container
docker compose restart

# Rebuild and restart
docker compose up -d --build

# Stop everything
docker compose down
```

### PM2
```bash
# View logs
pm2 logs bmad-workspace

# Restart
pm2 restart bmad-workspace

# Monitor
pm2 monit

# Status
pm2 status
```

### Nginx
```bash
# Test config
sudo nginx -t

# Reload
sudo systemctl reload nginx

# View logs
sudo tail -f /var/log/nginx/error.log
```

---

## 🔄 Updating the Application

### With Docker
```bash
cd /var/www/bmad-workspace
# Upload new files
docker compose down
docker compose up -d --build
```

### With PM2
```bash
cd /var/www/bmad-workspace
# Upload new files
yarn install
yarn build
pm2 restart bmad-workspace
```

---

## 🆘 Troubleshooting

### Application not starting
```bash
# Check Docker logs
docker compose logs bmad-app

# Check if port is in use
sudo lsof -i :3000
```

### SSL Certificate issues
```bash
# Renew certificate
sudo certbot renew --dry-run

# Force renewal
sudo certbot renew --force-renewal
```

### 502 Bad Gateway
```bash
# Check if app is running
curl http://localhost:3000

# Check nginx config
sudo nginx -t
```

---

## 📞 Support

For issues, check:
1. Docker/PM2 logs
2. Nginx error logs: `/var/log/nginx/error.log`
3. System logs: `journalctl -xe`
