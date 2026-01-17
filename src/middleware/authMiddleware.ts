import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { error_codes } from "../utils/error_codes.js";

import { JwtPayload } from "jsonwebtoken";

interface AuthPayload extends JwtPayload {
  id: string;
  role: "contestee" | "creator";
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}




export const verifyToken = async (req:Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          data: null,
          error: error_codes.unauthorized,
        });
    }
    
    const token = authHeader.split(" ")[1]
    
    if (!token) {
        return res.status(401).json({
          success: false,
          data: null,
          error: error_codes.unauthorized,
        });
    }
    
    
    try {
        const currentUser = jwt.verify(token, process.env.JWT_SECRET!)

        req.user = currentUser as AuthPayload
        
    } catch (err) {
        return res.status(401).json({
          success: false,
          data: null,
          error: error_codes.unauthorized,
        });
    }
}