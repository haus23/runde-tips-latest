import { json, type DataFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import { getPublishedChampionshipBySlug } from '#modules/api/model/championships';

export async function loader({ params }: DataFunctionArgs) {
  const { championship: slug } = params;

  const championship = await getPublishedChampionshipBySlug(slug);
  if (!championship) {
    throw new Response(null, {
      status: 400,
      statusText: `Keine gültige Turnierkennung: ${slug}`,
    });
  }

  return json({ championship });
}

export default function ChampionshipLayout() {
  return <Outlet />;
}
