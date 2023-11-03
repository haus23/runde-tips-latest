import type { SVGProps } from 'react';

import { tw } from '#app/utils/tailwind';

import iconFile from './icons.svg';

const icons = ['avatar', 'close', 'computer', 'menu', 'moon', 'sun'] as const;
export type IconName = (typeof icons)[number];

export function Icon({
  name,
  className,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
}) {
  return (
    <svg {...props} className={tw('inline h-6 w-6 self-center', className)}>
      <use href={`${iconFile}#${name}`} />
    </svg>
  );
}
