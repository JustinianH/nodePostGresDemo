import { Client } from 'pg';

const client = new Client({
    user: 'user',
    host: 'localhost',
    database: 'node-db',
    password: 'secret',
    port: 5432,
});

client.connect()

client.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log('Connection successful');
    client.end()
});