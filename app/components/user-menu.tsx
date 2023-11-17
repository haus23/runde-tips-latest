import {
  Menu,
  MenuItem,
  MenuTrigger,
  OverlayArrow,
  Popover,
} from 'react-aria-components';

import { useUser } from '#app/utils/auth/user';

import { Button } from './(ui)/atoms/button';
import { Icon } from './(ui)/atoms/icon';

export function UserMenu() {
  const user = useUser();

  return (
    <MenuTrigger>
      <Button aria-label="User Menu">
        <Icon name="avatar" />
      </Button>
      <Popover placement="bottom end" className="rounded border bg-white">
        <OverlayArrow>
          <svg width={12} height={12} viewBox="0 0 12 12">
            <path d="M0 12 L6 6 L12 12" />
          </svg>
        </OverlayArrow>
        <Menu className="flex flex-col gap-y-2 px-4 py-2">
          {user.roles.includes('ADMIN') && (
            <MenuItem className="px-2 py-1" href="/manager">
              Manager
            </MenuItem>
          )}
          <MenuItem className="px-2 py-1" href="/logout">
            Log out
          </MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
