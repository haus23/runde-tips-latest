import { forwardRef } from 'react';
import {
  NavLink as RemixNavLink,
  type NavLinkProps as RemixNavLinkProps,
} from '@remix-run/react';

import {
  Link as AriaLink,
  type LinkProps as AriaLinkProps,
} from 'react-aria-components';

import { cva, type VariantProps } from '#app/utils/tailwind';

const linkVariants = cva({
  base: ['inline-flex items-center'],
  variants: {
    variant: {
      default: '',
      primary: '',
      toolbar:
        'rounded-lg border p-2 hover:bg-stone-100 aria-[current=page]:text-black',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface LinkProps extends AriaLinkProps, VariantProps<typeof linkVariants> {}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <AriaLink
        className={linkVariants({ variant, className })}
        ref={ref}
        {...props}
      />
    );
  },
);
Link.displayName = 'Link';

interface NavLinkProps
  extends RemixNavLinkProps,
    VariantProps<typeof linkVariants> {}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <RemixNavLink
        className={linkVariants({ variant, className })}
        ref={ref}
        {...props}
      />
    );
  },
);
Link.displayName = 'NavLink';

export { Link, NavLink };
