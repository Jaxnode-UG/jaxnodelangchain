// import in the Postgres module
import PG from 'pg';

// Get Pool object from using a destructor 
const { Pool } = PG;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'jaxnodevector',
    password: 'password',
    port: 5432
});

// const query = `CREATE TABLE vectordocs2 (id bigserial PRIMARY KEY, content text, metadata text, embedding text);`;

// const query = `INSERT INTO vectordocs2 (content, metadata, embedding) VALUES ('Some test content', 'a: { b: 1}', '');`;

const query = `SELECT * FROM vectordocs;`;
//  WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
const data = await pool.query(query);

console.log(data.rows);


// We close the pool once we are done.
pool.end(() => {
    console.log('closing the pool');
});