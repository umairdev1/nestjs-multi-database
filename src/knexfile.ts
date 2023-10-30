import { Knex } from 'knex';

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '123456',
      database: 'postgres',
      port: 5433,
    },
    migrations: {
      directory: './db/migrations',
    },
  },
  mysql: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'mysqldb',
      port: 3306,
    },
    migrations: {
      directory: './db/mysql_migrations',
    },
  },
};

export default knexConfig;
