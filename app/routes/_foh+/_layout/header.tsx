import { NavLink, useParams } from '@remix-run/react';

import { Link } from '#app/components/(ui)/link';
import { ChampionshipSelect } from '#app/components/championship-select';
import { Icon } from '#app/components/icon';
import { Logo } from '#app/components/logo';
import { UserMenu } from '#app/components/user-menu';
import { useIsAuthenticated } from '#app/utils/auth/user';

export function FohHeader() {
  const { championship = '' } = useParams();
  const isAuthenticated = useIsAuthenticated();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-2 shadow sm:px-4">
      <div className="flex items-center gap-x-4">
        <div className="flex">
          <Link variant="toolbar" className="border-0 px-1 py-0" href="/">
            <Logo />
          </Link>
        </div>
        <nav className="flex gap-x-2">
          <Link
            variant="toolbar"
            className="border-0"
            href={`/${championship}`}
          >
            Tabelle
          </Link>
          <Link
            variant="toolbar"
            className="border-0"
            href={`/${[championship, 'tipps/spieler']
              .filter(Boolean)
              .join('/')}`}
          >
            Spieler
          </Link>
          <Link
            variant="toolbar"
            className="border-0"
            href={`/${[championship, 'tipps/spiele']
              .filter(Boolean)
              .join('/')}`}
          >
            Spiele
          </Link>
        </nav>
      </div>
      <div className="flex gap-x-2">
        <ChampionshipSelect />
        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <Link href="/login" variant="toolbar">
            <Icon name="avatar" />
          </Link>
        )}
      </div>
    </header>
  );
}
