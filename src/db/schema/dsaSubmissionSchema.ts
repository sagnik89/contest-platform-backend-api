import {
  pgTable,
  uuid,
  text,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./userSchema";
import { dsaProblems } from "./dsaProblemSchema";

export const dsaSubmissions = pgTable("dsa_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  dsaProblemId: uuid("dsa_problem_id")
    .notNull()
    .references(() => dsaProblems.id),
  code: text("code").notNull(),
  language: varchar("language", { length: 50 }),
  status: varchar("status", { length: 50 }),
  pointsEarned: integer("points_earned")
    .notNull()
    .$default(() => 0),
  totalTestCasesPassed: integer("total_test_cases_passed")
    .notNull()
    .$default(() => 0),
  totalTestCases: integer("total_test_cases")
    .notNull()
    .$default(() => 0),
  executionTime: integer("execution_time").notNull(),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).defaultNow(),
});
