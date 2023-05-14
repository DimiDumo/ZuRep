import knex, { Knex } from 'knex';
import { env } from '$env/dynamic/private';
import { canInsertRow } from './table-restrictions';

let pgInstance: Knex;

type KnexColumnListing = {
  type: string;
  maxLength?: number;
  nullable: boolean;
  defaultValue: any;
};

const dbTypesToFormTypes: { [key: string]: string } = {
  'character varying': 'string',
  text: 'text',
  boolean: 'boolean'
};

const db = {
  pg() {
    if (pgInstance) return pgInstance;
    pgInstance = knex({
      client: 'pg',
      connection: env.PG_CONNECTION_STRING
      //   searchPath: ['knex', 'public']
    });
    return pgInstance;
  },
  async getSchema(tableName: string) {
    const db = this.pg();
    const hasTable = await db.schema.hasTable(tableName);

    if (!hasTable) {
      throw Error(`Table ${tableName} does not exist`);
    }

    const allColumnListing = await db(tableName).columnInfo();
    console.log('allColumnListing: ', allColumnListing);

    // internal columns start with "__", these are ignored in the form
    const columnListing = Object.entries(allColumnListing)
      .map(([key, value]) => ({ name: key, type: value.type }))
      .filter((columnListing) => columnListing.name.substring(0, 2) !== '__')
      .map((columnListing) => ({
        ...columnListing,
        type: dbTypesToFormTypes[columnListing.type]
      }));

    // await db.destroy();
    console.log('columnListing: ', columnListing);
    return columnListing;
  },
  async saveRow(data: Record<string, any>, userId: string, table: string) {
    const db = this.pg();

    // will throw an Error if cannot insert
    // await canInsertRow(data, userId, table, db);

    await db(table).insert({
      ...data,
      __user_id: userId,
      // TODO: timestamp should be automatically set by db?
      __created_at: new Date()
    });
    return true;
  }
};

export default db;
