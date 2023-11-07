import { relations } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const rulesetTable = sqliteTable('rulesets', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),

  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),

  description: text('description').notNull(),
  extraQuestionRule: text('extra_question_rule').notNull(),
  matchRule: text('match_rule').notNull(),
  roundRule: text('round_rule').notNull(),
  tipRule: text('tip_rule').notNull(),
});

export const championshipTable = sqliteTable('championships', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),

  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),

  nr: integer('nr').notNull(),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
  extraPointsPublished: integer('extra_points_published', { mode: 'boolean' })
    .notNull()
    .default(false),

  rulesetId: integer('ruleset_id')
    .notNull()
    .references(() => rulesetTable.id),
});

export const userTable = sqliteTable('users', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),

  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),

  roles: text('roles').notNull(),
  email: text('email').unique(),
});

export const playerTable = sqliteTable('players', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),

  // TODO: kann wegfallen nach Ablöse des tipprunde-hinterhof Projektes bzw. dem Seed aus den alten Daten
  firebaseId: text('firebase_id').notNull().unique(),

  points: integer('points').notNull().default(0),
  extraPoints: real('extra_points').notNull().default(0),
  totalPoints: real('total_points').notNull().default(0),
  rank: integer('rank').notNull().default(0),

  championshipId: integer('championship_id')
    .notNull()
    .references(() => championshipTable.id),
  userId: integer('user_id')
    .notNull()
    .references(() => userTable.id),
});

export const playerRelations = relations(playerTable, ({ one }) => ({
  user: one(userTable, {
    fields: [playerTable.userId],
    references: [userTable.id],
  }),
}));
