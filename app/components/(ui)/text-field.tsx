import { forwardRef } from 'react';

import {
  TextField as AriaTextField,
  FieldError,
  Input,
  Label,
  type TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components';

import { cva, cx, type VariantProps } from '#app/utils/tailwind';

const inputVariants = cva({
  base: [
    'mt-1 block w-full appearance-none rounded-md border px-3 py-2 shadow-sm sm:text-sm',
  ],
  variants: {
    variant: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface TextFieldProps
  extends AriaTextFieldProps,
    VariantProps<typeof inputVariants> {
  label: string;
  labelHidden?: boolean;
  placeholder?: string;
  errorMessage?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      errorMessage,
      label,
      labelHidden = false,
      placeholder,
      className,
      variant,
      ...props
    },
    ref,
  ) => {
    return (
      <AriaTextField
        validationBehavior="aria"
        {...props}
        className="data-[invalid]:text-red-500"
      >
        <Label
          className={cx(labelHidden && 'sr-only', 'block text-sm font-medium')}
        >
          {label}
        </Label>
        <Input
          placeholder={placeholder}
          ref={ref}
          className={inputVariants({ variant, className })}
        />
        <FieldError className="mt-2 block text-sm" />
      </AriaTextField>
    );
  },
);

TextField.displayName = 'TextField';

export { TextField };
