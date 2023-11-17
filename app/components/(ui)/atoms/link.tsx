import { forwardRef } from 'react';
import {
  Link as RemixLink,
  NavLink as RemixNavLink,
  type LinkProps as RemixLinkProps,
  type NavLinkProps as RemixNavLinkProps,
} from '@remix-run/react';

import { usePress, type PressEvents } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';

import { cva, type VariantProps } from '#app/utils/tailwind';

const linkVariants = cva({
  base: [''],
  variants: {
    variant: {
      default: '',
      toolbar: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface LinkProps
  extends RemixLinkProps,
    PressEvents,
    VariantProps<typeof linkVariants> {}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      variant,
      onPress,
      onPressStart,
      onPressEnd,
      onPressChange,
      onPressUp,
      ...props
    },
    ref,
  ) => {
    const { pressProps } = usePress({
      onPress,
      onPressStart,
      onPressEnd,
      onPressChange,
      onPressUp,
    });

    props = mergeProps(pressProps, {
      ...props,
    });

    return (
      <RemixLink
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
NavLink.displayName = 'NavLink';

export { Link, NavLink };
