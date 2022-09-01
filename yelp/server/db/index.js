const { Pool } = require("pg");

const pool = new Pool({ // Optional (knows already to read them from .env file)
    user:  process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

module.exports = {
    query: (text, params) => pool.query(text, params)
}