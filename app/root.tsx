import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from '@remix-run/node';
import { Links, LiveReload, Outlet, Scripts } from '@remix-run/react';

import styles from '#app/styles.css';

import { getUserId } from './modules/auth/auth.server';
import { db } from './utils/server/db.server';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);
  const user =
    (userId &&
      (await db.query.userTable.findFirst({
        where: (user, { eq }) => eq(user.id, userId),
      }))) ||
    null;

  return json({ user });
}

export default function App() {
  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>runde.tips</title>
        <Links />
      </head>
      <body>
        <Outlet />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
