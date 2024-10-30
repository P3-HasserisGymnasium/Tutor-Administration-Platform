#!/bin/bash

# Create a timestamp for the backup
TIMESTAMP=$(date +"%F_%H-%M-%S")

# Run mysqldump and save the backup file
mysqldump -h mysql-database -u user -ppassword students > /backup/db_backup_$TIMESTAMP.sql


echo "Backup completed at $TIMESTAMP"