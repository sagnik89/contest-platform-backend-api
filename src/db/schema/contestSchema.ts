import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./userSchema";

export const contests = pgTable("contests", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  creatorId: uuid("creator_id")
    .notNull()
    .references(() => users.id),
  startTime: timestamp("start_time", { withTimezone: true }).notNull(),
  endTime: timestamp("end_time", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
