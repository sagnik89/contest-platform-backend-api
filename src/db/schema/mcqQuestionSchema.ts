import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";
import { contests } from "./contestSchema";

export const mcqQuestions = pgTable("mcq_questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  contestId: uuid("contest_id")
    .notNull()
    .references(() => contests.id),
  questionText: text("question_text").notNull(),
  options: jsonb(),
  ccorrectOptionIndex: integer("correct_option_index"),
  points: integer("points").$default(() => 1),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
