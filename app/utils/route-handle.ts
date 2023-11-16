import { useMatches } from '@remix-run/react';

type RouteHandle = {
  viewPath: string;
};

function isRouteHandle(handle: unknown): handle is RouteHandle {
  return typeof handle === 'object' && handle !== null && 'viewPath' in handle;
}

export function useViewPath() {
  const matches = useMatches();

  // Get the viewPath-handle from the route leaf node
  const handle = matches.at(-1)?.handle;
  return isRouteHandle(handle) ? handle.viewPath : undefined;
}
