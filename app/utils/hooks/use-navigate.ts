import { useCallback } from 'react';
import { useNavigate as useRemixNavigate } from '@remix-run/react';

/*
 * Augment remix useNavigate hook to use unstable viewTransitions by default.
 * Opt-out via option unstable_viewTransition: false.
 */
export function useNavigate() {
  const remixNavigate = useRemixNavigate();

  const navigate: typeof remixNavigate = useCallback((to, options?) => {
    if (typeof to === 'number') {
      remixNavigate(to);
    } else {
      remixNavigate(to, {
        unstable_viewTransition: true,
        ...(options ? options : {}),
      });
    }
  }, []);

  return navigate;
}
