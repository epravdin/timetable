import { Kysely, PostgresDialect, sql } from 'kysely';
import { DbConfig } from './config.interface';
import { Pool } from 'pg';

export class DbConnection {
  private static instance: Kysely<unknown>;

  private static config: DbConfig;

  private constructor() {}

  static getInstance() {
    if (!DbConnection.instance) {
      const { config } = DbConnection;

      if (!config) {
        throw new Error(
          'Set db config before getting instance of db connection'
        );
      }

      const dialect = new PostgresDialect({
        pool: new Pool({
          database: config.db,
          host: config.host,
          user: config.user,
          port: config.port,
          password: config.password,
          max: 10,
        }),
      });

      DbConnection.instance = new Kysely({ dialect });
    }
    return DbConnection.instance;
  }

  static init(config: DbConfig) {
    if (!DbConnection.config) {
      DbConnection.config = { ...config };
    }
  }

  static async testConnection() {
    try {
      await sql`select 1+1`.execute(DbConnection.getInstance());
    } catch (e) {
      console.error('Connection error');
      throw e;
    }
  }

  static async close() {
    await DbConnection.getInstance().destroy();
  }
}
