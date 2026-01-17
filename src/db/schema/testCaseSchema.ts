import {
  PgTable,
  uuid,
  text,
  pgTable,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { dsaProblems } from "./dsaProblemSchema";

export const testCases = pgTable("test_cases", {
  id: uuid("id").primaryKey().defaultRandom(),
  problemId: uuid("problem_id")
    .notNull()
    .references(() => dsaProblems.id),
  input: text("input"),
  expectedOutput: text("expected_ouput").notNull(),
  isHidden: boolean("is_hidden").$default(() => false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
