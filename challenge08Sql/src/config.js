export default {
  sqlite3: {
      client: 'sqlite3',
      connection: {
          filename: `./DB/ecommerce.sqlite`
      },
      useNullAsDefault: true
  },
//   Actualizar parámetros de mariaDb
  mariaDb: {
      client: 'mysql',
      connection: {
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'coderhouse'
      }
  }
}