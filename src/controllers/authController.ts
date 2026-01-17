import { RequestHandler } from "express";
import { z } from "zod";
import { createUser, findUserByEmail } from "../db/dbHelper.js";
import { error_codes } from "../utils/error_codes.js";


// zod schema
const signupSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  role: z.enum(["contestee", "creator"]).optional(),
});


// user signup controller
export const userSignup: RequestHandler = async (req, res) => {

  // zod validation
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      data: null,
      error: error_codes.invalid_request,
    });
  }

  // validated data
  const userData = result.data;

  try {

    // checking for email
    const existingUser = await findUserByEmail(userData.email);

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        data: null,
        error: error_codes.email_exists,
      });
    }

    // creating new user
    const [newUser] = await createUser(
      userData.name,
      userData.email,
      userData.password,
      userData.role,
    );

    return res.status(201).json({
      success: true,
      data: newUser,
      error: null,
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

export const userLogin: RequestHandler = async (req, res) => {
  res.json({
    msg: "Login",
  });
};
