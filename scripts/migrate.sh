#!/bin/bash
# Run Prisma migrations for production
echo "Running Prisma migrations..."
npx prisma migrate deploy
if [ $? -eq 0 ]; then
  echo "Migrations completed successfully!"
else
  echo "Migration failed. Please check your DATABASE_URL and database connection."
  exit 1
fi

