import { Pool } from 'pg';

const pool = new Pool({
 user: 'postgres',
 host: 'localhost',
 database: "postgres",
 password: "tvsvictor", //Change this with your password 
 port: 5432,
});
export default pool;