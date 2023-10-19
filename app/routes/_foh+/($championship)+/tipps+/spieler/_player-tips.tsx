import { json, type DataFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { db } from '#app/utils/server/db.server';

export const loader = async ({ params, request }: DataFunctionArgs) => {
  const accountSlug = new URL(request.url).searchParams.get('name') || '';

  const user = await db.query.userTable.findFirst({
    where: (users, { eq }) => eq(users.slug, accountSlug),
  });

  return json(user);
};

export default function PlayerTipsRoute() {
  const user = useLoaderData<typeof loader>();
  return (
    <div>
      <h2>Tipps von {user.name}</h2>
    </div>
  );
}
