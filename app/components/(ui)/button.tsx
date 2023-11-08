import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import { cva, type VariantProps } from 'cva';
import { twMerge } from 'tailwind-merge';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center px-4 py-2 font-medium',
    'rounded border', // Dev Classes
  ],
  {
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
  },
);

interface ButtonProps
  extends ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <button
        className={twMerge(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };
