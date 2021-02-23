
import knex from 'knex';
import path from 'path';

const db = knex({
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true, // Define os arquivos do DB como NULL por padrão quando não entender ou receber dados

});

export default db;
