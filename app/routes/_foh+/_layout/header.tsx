import { Link, NavLink, useParams } from '@remix-run/react';

import { ChampionshipSelect } from '#components/championship-select';
import { Icon } from '#components/icon';
import { Logo } from '#components/logo';
import { UserMenu } from '#components/user-menu';
import { useIsAuthenticated } from '#utils/auth/user';

export function FohHeader() {
  const { championship = '' } = useParams();
  const isAuthenticated = useIsAuthenticated();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-2 shadow sm:px-4">
      <div className="flex items-center gap-x-4">
        <div>
          <Link to="/" unstable_viewTransition>
            <Logo />
          </Link>
        </div>
        <nav className="flex gap-x-2">
          <NavLink to={`/${championship}`} unstable_viewTransition>
            Tabelle
          </NavLink>
          <NavLink
            unstable_viewTransition
            to={`/${[championship, 'tipps/spieler'].filter(Boolean).join('/')}`}
          >
            Spieler
          </NavLink>
          <NavLink
            unstable_viewTransition
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
          <Link unstable_viewTransition to="/login">
            <Icon name="avatar" />
          </Link>
        )}
      </div>
    </header>
  );
}
