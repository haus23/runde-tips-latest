import { useLocation, useParams } from '@remix-run/react';

export function useCurrentView() {
  const { pathname, search, state } = useLocation();
  const { championship: slug = '' } = useParams();

  const segments = pathname.slice(1).split('/');

  const view = {
    featureSegment: '',
    championshipSegment: '',
    viewSegment: '',
    search,
    state,
  };

  if (segments[0] === 'manager') {
    view.featureSegment = 'manager';
    segments.shift();
  }

  if (segments[0] === slug) {
    view.championshipSegment = segments[0];
    segments.shift();
  }

  view.viewSegment = segments.join('/');

  return view;
}
