import { db } from '../db.server';

export async function getUserById(id: number) {
  const user = await db.query.userTable.findFirst({
    where: (user, { eq }) => eq(user.id, id),
  });
  return user ?? null;
}

export async function getUserByEmail(email: string) {
  const user = await db.query.userTable.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });

  return user ?? null;
}
