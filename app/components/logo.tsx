import LogoImage from './logo.svg';

export function Logo() {
  return (
    <div className="flex items-center gap-x-1 pr-1">
      <svg className="h-12 w-12 fill-current">
        <use href={`${LogoImage}#logo`} />
      </svg>
      <span className="text-xl font-semibold">runde.tips</span>
    </div>
  );
}
