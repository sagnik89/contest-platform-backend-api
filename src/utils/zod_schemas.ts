import {z} from "zod"

// zod schemas

export const signupSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  role: z.enum(["contestee", "creator"]).optional(),
});


export const loginSchema = z.object({
    email: z.email(),
    password: z.string()
})
