import { z } from 'zod';

import { db } from '../db.server';

const ChampionshipSlug = z
  .string()
  .regex(/^[a-z]{2}\d{4}$/, 'Bad championship id')
  .optional();

export async function getPublishedChampionships() {
  return await db.query.championshipTable.findMany({
    where: (championship, { eq }) => eq(championship.published, true),
    orderBy: (championship, { desc }) => [desc(championship.nr)],
  });
}

export async function getPublishedChampionshipBySlug(slug?: string) {
  const parsedSlug = ChampionshipSlug.safeParse(slug);

  if (!parsedSlug.success) {
    throw new Response(null, {
      status: 404,
      statusText: `Not found`,
    });
  }

  const championship = await db.query.championshipTable.findFirst({
    where: (championship, { eq, and }) =>
      and(
        eq(championship.published, true),
        slug ? eq(championship.slug, slug) : undefined,
      ),
    orderBy: (championship, { desc }) => [desc(championship.nr)],
  });

  if (!championship) {
    throw new Response(null, {
      status: 400,
      statusText: `Keine gültige Turnierkennung: ${slug}`,
    });
  }

  return championship;
}
