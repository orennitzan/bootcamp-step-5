// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: 'postgres',
      host: 'localhost',
      database: 'risingstack',
      password: 'P123456',
      port: 5432
    },
    migrations: {
      tableName: 'migrations'
    },
    pool: { min: 0, max: 10 } // Note that the default is 2-10. See: https://knexjs.org/#Installation-pooling
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
