import ky from 'ky';

import { drizzleInstance as db } from '#app/modules/api/orm/drizzle.instance';
import { userTable } from '#app/modules/api/orm/schema';

export async function seedUsers() {
  const users = await ky
    .get('https://backend.runde.tips/api/v1/accounts')
    .json<any[]>();

  users.forEach(async (user) => {
    await db
      .insert(userTable)
      .values({
        name: user.name,
        slug: user.id,
        email: user.email ? user.email : undefined,
        roles: JSON.stringify(
          user.role === 'ADMIN' ? ['ADMIN', 'PLAYER'] : ['PLAYER'],
        ),
      })
      .onConflictDoUpdate({
        target: userTable.slug,
        set: {
          name: user.name,
          email: user.email ? user.email : undefined,
        },
      });
  });
}
