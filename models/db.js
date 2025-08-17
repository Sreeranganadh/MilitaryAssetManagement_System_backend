const { Pool } = require('pg');
require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:sree@localhost:5432/Military';

const pool = new Pool({
  connectionString,
  ssl: isProd ? { rejectUnauthorized: false } : false
});

pool.on('error', (err) => {
  console.error('Unexpected idle client error', err);
});

module.exports = pool;