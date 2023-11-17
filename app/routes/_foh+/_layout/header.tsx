import { useParams } from '@remix-run/react';

import { Icon } from '#app/components/(ui)/atoms/icon';
import { Link, NavLink } from '#app/components/(ui)/atoms/link';
import { ChampionshipSelect } from '#app/components/championship-select';
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
          <Link variant="toolbar" className="border-0 px-1 py-0" to="/">
            <Logo />
          </Link>
        </div>
        <nav className="flex gap-x-2">
          <NavLink
            variant="toolbar"
            className="border-0"
            to={`/${championship}`}
            end
          >
            Tabelle
          </NavLink>
          <NavLink
            variant="toolbar"
            className="border-0"
            to={`/${[championship, 'tipps/spieler'].filter(Boolean).join('/')}`}
          >
            Spieler
          </NavLink>
          <NavLink
            variant="toolbar"
            className="border-0"
            to={`/${[championship, 'tipps/spiele'].filter(Boolean).join('/')}`}
          >
            Spiele
          </NavLink>
        </nav>
      </div>
      <div className="flex gap-x-2">
        <ChampionshipSelect />
        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <Link to="/login" variant="toolbar">
            <Icon name="avatar" />
          </Link>
        )}
      </div>
    </header>
  );
}
