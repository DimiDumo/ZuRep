import type { Knex } from 'knex';

const insertRestrictions: {
  [key: string]: (
    data: Record<string, any>,
    userId: string,
    db: Knex
  ) => Promise<boolean>;
} = {
  feedback: async (data: Record<string, any>, userId: string, db: Knex) => {
    console.log('data: ', data);

    // boolean values from checkbox forms are either 'on' for true
    // of undefinded for false
    const isPositive = !!data['Positive*'];

    const [{ count }] = await db('feedback')
      .where({
        __user_id: userId,
        'Positive*': isPositive
      })
      .count('*');

    if (+count < 5) return true;

    const err = new Error(
      `You cannot add more ${isPositive ? 'positive' : 'negative'} feedbacks.`
    );
    err.name = 'restricted';

    throw err;
  }
};

// this can be replaced by dynamically getting restrictions
// restriction function should return true if an operation is allowed
export function canInsertRow(
  data: Record<string, any>,
  userId: string,
  table: string,
  db: Knex
) {
  const insertRestriction = insertRestrictions[table];
  if (!insertRestriction) return true;
  else return insertRestriction(data, userId, db);
}
