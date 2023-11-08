import { forwardRef } from 'react';

import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';

import { cva, type VariantProps } from '#utils/tailwind';

const buttonVariants = cva({
  base: [
    'inline-flex items-center justify-center px-4 py-2 font-medium',
    'rounded border', // Dev Classes
  ],
  variants: {
    variant: {
      default: '',
      primary: '',
      toolbar: 'px-2',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface ButtonProps
  extends AriaButtonProps,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <AriaButton
        className={buttonVariants({ variant, className })}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };
