import { forwardRef } from 'react';

import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';

import { cva, type VariantProps } from '#app/utils/tailwind';

const buttonVariants = cva({
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
