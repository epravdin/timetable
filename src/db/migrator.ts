import * as path from 'path';
import { promises as fs } from 'fs';
import { Migrator, FileMigrationProvider, Kysely } from 'kysely';
import dotenv from 'dotenv';
import { DbConnection } from './db';
dotenv.config();

class MigratorEngine {
  private db: Kysely<unknown>;
  private migrator: Migrator;

  public actions = ['migrateToLatest', 'migrateDown'];

  constructor() {
    DbConnection.init({
      db: process.env.POSTGRES_DB as string,
      user: process.env.POSTGRES_USER as string,
      password: process.env.POSTGRES_PASSWORD as string,
      host: process.env.POSTGRES_HOST as string,
      port: parseInt(process.env.POSTGRES_PORT as string),
    });
    this.db = DbConnection.getInstance();

    this.migrator = new Migrator({
      db: this.db,
      provider: new FileMigrationProvider({
        fs,
        path,
        migrationFolder: path.join(__dirname, 'migrations'),
      }),
    });
  }

  private async migrateToLatest() {
    const { error, results } = await this.migrator.migrateToLatest();

    results?.forEach((it) => {
      if (it.status === 'Success') {
        console.log(
          `migration "${it.migrationName}" was executed successfully`
        );
      } else if (it.status === 'Error') {
        console.error(`failed to execute migration "${it.migrationName}"`);
      }
    });

    if (error) {
      console.error('failed to migrate');
      console.error(error);
      process.exit(1);
    }
  }

  private async migrateDown() {
    const { error, results } = await this.migrator.migrateDown();

    results?.forEach((it) => {
      if (it.status === 'Success') {
        console.log(`migration "${it.migrationName}" was down successfully`);
      } else if (it.status === 'Error') {
        console.error(`failed to down migration "${it.migrationName}"`);
      }
    });

    if (error) {
      console.error('failed to migrate');
      console.error(error);
      process.exit(1);
    }
  }

  public async run(action: string) {
    if (action === 'migrateToLatest') {
      return this.migrateToLatest();
    }

    if (action === 'migrateDown') {
      return this.migrateDown();
    }
  }
}

const handler = async () => {
  const action = process.argv.slice(2).shift();

  const migratorEngine = new MigratorEngine();

  if (!action || !migratorEngine.actions.includes(action)) {
    throw new Error('Specify action: migrateToLatest or migrateDown');
  }

  await migratorEngine.run(action);
};

handler();
