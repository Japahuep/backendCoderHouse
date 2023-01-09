import knex from 'knex'
import config from '../src/config.js'

//------------------------------------------
// productos en MariaDb

const mariaDbTable = async () => {
    try {
        const mariaDbClient = knex(config.mariaDb)
    
        //Implementar creación de tabla con sus atributos
        console.log('--> If table exists delete it');
        await mariaDbClient.schema.dropTableIfExists('products');
    
        console.log('--> Create table');
        await mariaDbClient.schema.createTable('products', table => {
          table.increments('id').primary;
          table.string('title', 15).notNullable();
          table.float('price');
          table.string('thumbnail');
        });
        console.log('Product table successfully created in mariaDB')
        await mariaDbClient.destroy();
    } catch (error) {
        console.log('Error when creating the product table in mariaDb')
        console.log(error)
    }
}

//------------------------------------------
// mensajes en SQLite3
const sqliteTable = async () => {
    try {
        const sqliteClient = knex(config.sqlite3)
    
    
        //Implementar creación de tabla con sus atributos
        console.log('--> If table exists delete it');
        await sqliteClient.schema.dropTableIfExists('messages');
    
        console.log('--> Create table');
        await sqliteClient.schema.createTable('messages', table => {
          table.increments('id').primary;
          table.string('name', 20).notNullable();
          table.string('message', 50);
          table.string('fyh').notNullable();
        });
        
        console.log('Message table successfully created in sqlite3')
        await sqliteClient.destroy();
    } catch (error) {
        console.log('Error when creating the message table in sqlite3')
        console.log(error)
    }
}

mariaDbTable();
sqliteTable();