import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();





export function generate(userName) {
    return jwt.sign({userName}, process.env.TOKEN_SECRET, { expiresIn: "24h",});
  }