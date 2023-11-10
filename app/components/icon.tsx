import type { SVGProps } from 'react';

import { cx } from '#app/utils/tailwind';

import iconFile from './icons.svg';

const icons = [
  'avatar',
  'check',
  'close',
  'computer',
  'menu',
  'moon',
  'search',
  'sun',
] as const;
export type IconName = (typeof icons)[number];

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

export function Icon({ name, className, ...props }: IconProps) {
  return (
    <svg {...props} className={cx('inline h-6 w-6 self-center', className)}>
      <use href={`${iconFile}#${name}`} />
    </svg>
  );
}
