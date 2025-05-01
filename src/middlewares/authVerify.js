import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const verfyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Authorization header:", authHeader); // Debugging header

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Token is required" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token from 'Bearer token_value'
  console.log("Extracted Token:", token); // Debugging token

  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      console.log("Token verification failed:", error); // Debugging error
      return res.status(401).json({ message: "Unauthorized token" });
    }

    console.log("Decoded token:", decoded); // Debugging decoded token
    req.user = decoded;
    next();
  });
};
