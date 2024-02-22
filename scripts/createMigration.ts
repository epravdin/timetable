import { promises as fs } from 'fs';
import path from 'path';

const pathToMigrations = path.join(__dirname, '..', 'src', 'db', 'migrations');

const handler = async () => {
  const name = process.argv.slice(2).shift();

  if (!name) {
    throw new Error(`Please specify the migration's name`);
  }

  const filePath = path.join(
    pathToMigrations,
    `${new Date().toISOString()}-${name}.ts`
  );
  await fs.open(filePath, 'w');
  await fs.writeFile(
    filePath,
    `import { Kysely } from 'kysely';
export async function up(db: Kysely<any>): Promise<void> {
  // Migration code
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code
}
`,
    'utf-8'
  );
};

handler();
