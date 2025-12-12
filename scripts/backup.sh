#!/bin/bash

# BMAD Workspace - Backup Script
# Creates a backup of the application and optionally MongoDB data

set -e

BACKUP_DIR="/var/backups/bmad"
DATE=$(date +%Y%m%d_%H%M%S)
APP_DIR="/var/www/bmad-workspace"

echo "🔄 BMAD Workspace Backup Script"
echo "==============================="

# Create backup directory
mkdir -p $BACKUP_DIR

echo "Creating backup: bmad_backup_${DATE}.tar.gz"

# Backup application files (excluding node_modules and .next)
tar -czf "${BACKUP_DIR}/bmad_backup_${DATE}.tar.gz" \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='*.log' \
    -C "$(dirname $APP_DIR)" "$(basename $APP_DIR)"

# Optional: Backup MongoDB if running
# if docker ps | grep -q bmad-mongodb; then
#     echo "Backing up MongoDB..."
#     docker exec bmad-mongodb mongodump --out /dump
#     docker cp bmad-mongodb:/dump "${BACKUP_DIR}/mongodb_${DATE}"
#     docker exec bmad-mongodb rm -rf /dump
# fi

# Remove backups older than 7 days
find $BACKUP_DIR -name "bmad_backup_*.tar.gz" -mtime +7 -delete

echo "✅ Backup completed: ${BACKUP_DIR}/bmad_backup_${DATE}.tar.gz"
echo ""
echo "To restore:"
echo "  tar -xzf ${BACKUP_DIR}/bmad_backup_${DATE}.tar.gz -C /var/www/"
