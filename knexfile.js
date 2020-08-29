const PATH = require('path');

require('dotenv').config({ path: __dirname });

const { CLIENT, DATABASE, PG_USER, PASSWORD, HOST, PG_PORT } = process.env;



module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'deliver_pickup',
      user: PG_USER,
      password: PASSWORD,
      host: HOST,
      port: PG_PORT,
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
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
