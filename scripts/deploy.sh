#!/bin/bash

# BMAD Workspace - Deployment Script
# Run this on your Hetzner server after uploading files

set -e

echo "🚀 BMAD Workspace Deployment Script"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo -e "${RED}Please don't run as root. Run as regular user with sudo access.${NC}"
    exit 1
fi

# Get domain from user
read -p "Enter your domain name (e.g., bmad.example.com): " DOMAIN
read -p "Enter your email for SSL certificate: " EMAIL

echo ""
echo -e "${YELLOW}Step 1: Updating system...${NC}"
sudo apt update && sudo apt upgrade -y

echo ""
echo -e "${YELLOW}Step 2: Installing Docker...${NC}"
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    echo -e "${GREEN}Docker installed successfully${NC}"
else
    echo -e "${GREEN}Docker already installed${NC}"
fi

echo ""
echo -e "${YELLOW}Step 3: Installing Docker Compose...${NC}"
sudo apt install docker-compose-plugin -y

echo ""
echo -e "${YELLOW}Step 4: Installing Nginx...${NC}"
sudo apt install nginx -y

echo ""
echo -e "${YELLOW}Step 5: Installing Certbot...${NC}"
sudo apt install certbot python3-certbot-nginx -y

echo ""
echo -e "${YELLOW}Step 6: Building Docker image...${NC}"
docker compose build

echo ""
echo -e "${YELLOW}Step 7: Starting application...${NC}"
docker compose up -d

echo ""
echo -e "${YELLOW}Step 8: Configuring Nginx...${NC}"

# Create nginx config
sudo tee /etc/nginx/sites-available/bmad-workspace > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/bmad-workspace /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload nginx
sudo nginx -t
sudo systemctl reload nginx

echo ""
echo -e "${YELLOW}Step 9: Setting up SSL certificate...${NC}"
sudo mkdir -p /var/www/certbot
sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --non-interactive --agree-tos -m ${EMAIL}

echo ""
echo -e "${YELLOW}Step 10: Setting up firewall...${NC}"
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "Your BMAD Workspace is now running at:"
echo -e "${GREEN}https://${DOMAIN}${NC}"
echo ""
echo -e "Useful commands:"
echo -e "  View logs:     ${YELLOW}docker compose logs -f${NC}"
echo -e "  Restart:       ${YELLOW}docker compose restart${NC}"
echo -e "  Stop:          ${YELLOW}docker compose down${NC}"
echo -e "  Rebuild:       ${YELLOW}docker compose up -d --build${NC}"
echo ""
