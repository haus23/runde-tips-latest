import { cx, type CxOptions } from 'cva';
import { twMerge } from 'tailwind-merge';

export function tw(...inputs: CxOptions) {
  return twMerge(cx(inputs));
}
