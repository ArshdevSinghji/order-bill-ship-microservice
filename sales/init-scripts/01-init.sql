#!/bin/bash
set -e

# Create database if it doesn't exist
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create extensions if needed
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    -- Create additional schemas if needed
    -- CREATE SCHEMA IF NOT EXISTS sales;
    
    -- Grant privileges
    GRANT ALL PRIVILEGES ON DATABASE sales_db TO sales;
EOSQL

echo "Database initialization completed successfully!"
