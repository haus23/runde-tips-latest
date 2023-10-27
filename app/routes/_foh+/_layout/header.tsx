import { Link, NavLink, useParams } from '@remix-run/react';

import { ChampionshipSelect } from '#app/components/championship-select';
import { Icon } from '#app/components/icon';
import { Logo } from '#app/components/logo';

export function FohHeader() {
  const { championship = '' } = useParams();

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
        <Link unstable_viewTransition to="/login">
          <Icon name="avatar" />
        </Link>
      </div>
    </header>
  );
}
