// ...existing code...
require('dotenv').config();
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/Military';

const poolConfig = {
  connectionString
};

// when using a hosted DATABASE_URL (Render, Heroku, etc.) enable SSL with rejectUnauthorized false
if (process.env.DATABASE_URL) {
  poolConfig.ssl = { rejectUnauthorized: false };
}

const pool = new Pool(poolConfig);

module.exports = pool;
// ...existing code...