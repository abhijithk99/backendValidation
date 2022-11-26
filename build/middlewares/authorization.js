"use strict";
// import { NextFunction, Request, Response } from "express";
// const jwt = require("jsonwebtoken");
// const authorization = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token = req.headers.authentication;
//     if (!token) {
//       return res.status(401).json({ message: "cannot find token" });
//     }
//     const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
//     const user = {
//       id: decoded.userId,
//       role: decoded.role,
//     };
//     // req.user = user;
//     next();
//     return res.status(400).json({ message: "user authentiated" });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "there was an error in aunthentiation" });
//   }
// };
// module.exports = {
//   authorization,
// };
