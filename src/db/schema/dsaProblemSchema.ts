import {
  pgTable,
  uuid,
  text,
  jsonb,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { contests } from "./contestSchema";

export const dsaProblems = pgTable("dsa_problems", {
  id: uuid("id").primaryKey().defaultRandom(),
  contestId: uuid("contest_id")
    .notNull()
    .references(() => contests.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  tags: jsonb(),
  points: integer("points")
    .notNull()
    .$default(() => 100),
  timeLimit: integer("time_limit")
    .notNull()
    .$default(() => 2000),
  memoryLimit: integer("memory_limit")
    .notNull()
    .$default(() => 256),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
