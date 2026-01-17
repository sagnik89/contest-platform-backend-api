import { eq } from "drizzle-orm";
import { db } from "./config.js";
import { users } from "./schema/userSchema.js";

export const findUserByEmail = async (email: string) => {
  return db
      .select({
          id: users.id,
          password: users.password,
          role: users.role,
      email: users.email,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: "contestee" | "creator" | undefined
) => {
  return db
    .insert(users)
    .values({ name, password, email, role })
      .returning({
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role
      });
};
