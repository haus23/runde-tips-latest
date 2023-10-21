import { Group, Link } from 'react-aria-components';

import { ChampionshipSelect } from '#app/components/championship-select';
import { Logo } from '#app/components/logo';

export function FohHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-2 shadow sm:px-4">
      <Group role="presentation" aria-label="Brand">
        <Link href="/">
          <Logo />
        </Link>
      </Group>
      <nav></nav>
      <Group role="presentation" aria-label="Actions">
        <ChampionshipSelect />
      </Group>
    </header>
  );
}
