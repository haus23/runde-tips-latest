import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from '@remix-run/node';
import { Links, LiveReload, Outlet, Scripts } from '@remix-run/react';

import { RouterProvider } from 'react-aria-components';

import { getUser } from '#app/modules/auth/auth.server';

import styles from './styles.css';
import { useNavigate } from './utils/use-navigate';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);

  return json({ user });
}

export default function App() {
  const navigate = useNavigate();

  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>runde.tips</title>
        <Links />
      </head>
      <body>
        <RouterProvider navigate={navigate}>
          <Outlet />
        </RouterProvider>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
