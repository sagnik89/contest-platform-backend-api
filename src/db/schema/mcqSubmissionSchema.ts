import {
  pgTable,
  uuid,
  text,
  varchar,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { users } from "./userSchema";
import { mcqQuestions } from "./mcqQuestionSchema";

export const mcqSubmissions = pgTable("mcq_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  mcqQuestionId: uuid("mcq_question_id")
    .notNull()
    .references(() => mcqQuestions.id),
  selectedOptionIndex: integer("selected_option_index").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  pointsEarned: integer("points_earned").$default(() => 0),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).defaultNow(),
});
