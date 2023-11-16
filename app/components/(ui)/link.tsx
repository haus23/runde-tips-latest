import { forwardRef } from 'react';

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
      toolbar: 'rounded-lg border p-2 hover:bg-stone-100',
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

export { Link };
