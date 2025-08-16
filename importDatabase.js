const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { Client } = require('pg');

async function importSql() {
    const sqlPath = path.join(__dirname, 'database.sql');
    if (!fs.existsSync(sqlPath)) {
        console.error('SQL file not found:', sqlPath);
        process.exit(1);
    }

    const sql = fs.readFileSync(sqlPath, 'utf8');

    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });

    try {
        await client.connect();
        console.log('Connected to database. Running SQL file...');
        await client.query(sql);
        console.log('SQL import completed successfully.');
    } catch (err) {
        console.error('Error importing SQL:', err.message || err);
        process.exitCode = 1;
    } finally {
        await client.end();
    }
}

importSql();