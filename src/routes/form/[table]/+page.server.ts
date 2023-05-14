import type { PageServerLoad } from './$types';
import db from '$lib/db/sql';
import { feedback } from '$lib/forms/feedback';

// should return data to render form
export const load = (async ({ locals, params: { table } }) => {
  console.log('locals: ', JSON.stringify(locals, null, 2));
  // const formSchema = await db.getSchema(table);

  return {
    table,
    feedback
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({
    request,
    params: { table },
    locals: {
      zupass: { userId }
    }
  }) => {
    const formData = await request.formData();
    const data: { [key: string]: string } = {};
    const errors: { [key: string]: string } = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
      if (key.charAt(key.length - 1) === '*' && !value) {
        errors[key] = `${key} is a required field`;
      }
    }

    console.log('errors: ', errors);
    console.log('data: ', data);

    return { errors: {} };

    if (!Object.keys(errors).length) {
      try {
        await db.saveRow(data, userId, table);
      } catch (err: any) {
        if ((err.name = 'restricted')) {
          return {
            errors: {
              __restricedError: err.message
            }
          };
        } else {
          throw err;
        }
      }
    }

    console.log('save done');

    return {
      errors
    };
  }
};
