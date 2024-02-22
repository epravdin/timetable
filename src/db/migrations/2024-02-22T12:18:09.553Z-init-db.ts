/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType('schedules_types')
    .asEnum(['routine', 'custom'])
    .execute();

  const query = db.schema
    .createTable('schedules')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn('description', 'text')
    .addColumn('date', 'date')
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    );

  console.log(query.compile());

  await query.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropType('schedules_types').execute();
  await db.schema.dropTable('schedules').execute();
}
