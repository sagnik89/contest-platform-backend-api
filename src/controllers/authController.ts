import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken"
import "dotenv/config"

import { createUser, findUserByEmail } from "../db/dbHelper.js";
import { error_codes } from "../utils/error_codes.js";
import { loginSchema, signupSchema } from "../utils/zod_schemas.js";



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

    // hashing password
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

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
  const result = loginSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      success: false,
      data: null,
      error: error_codes.invalid_request,
    });
  }

  const userData = result.data

  try {
    
    // returns an array... needed object -> first element of the array
    const [currentUser] = await findUserByEmail(userData.email)

    //user existence
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        data: null,
        error: error_codes.invalid_credentials,
      });
    }

    const matchingPass = await bcrypt.compare(userData.password, currentUser.password)

    if (!matchingPass) {
      return res.status(401).json({
        success: false,
        data: null,
        error: error_codes.invalid_credentials,
      });
    }

    const token = jwt.sign(
      {
        id: currentUser.id,
        role: currentUser.role
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN as string
      } as SignOptions

    )

    return res.status(200).json({
      success: true,
      data: {
        token: token
      },
      error: null,
    });


  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};
