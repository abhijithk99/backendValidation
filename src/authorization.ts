const jwt = require("jsonwebtoken");
import { Request, Response } from "express";

const createAccessToken = async (userId: any, err: Request, res: Response) => {
  try {
    const accessToken = await jwt.sign(
      {
        UserId: userId,
      },
      process.env.ACCESS_TOKEN_SECRET ?? "default-secret",
      { expiresIn: "10m" }
    );
    console.log(accessToken);
    return res.status(200).send("access token generated" + accessToken);
  } catch (error) {}
};

const createRefreshToken = async (
  userId: any,
  refreshTokenId: any,
  err: Request,
  res: Response
) => {
  try {
    const refreshToken = await jwt.sign(
      {
        UserId: userId,
        tokenId: refreshTokenId,
      },
      process.env.REFRESH_TOKEN_SECRET ?? "default-secret",
      { expiresIn: "30m" }
    );
    console.log(refreshToken);
    return res.status(200).send("refresh token generated" + refreshToken);
  } catch (error) {}
};

const verifyAccessToken = async (req: any, res: any, next: any) => {
  const token = req.headers.authentication;
  if (!token) {
    return res.status(400).send("error");
  }
  try {
    var decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    return next(res.status(200).send({ decoded }));
  } catch (error) {
    return next(res.send("not verified"));
  }
};

module.exports = {
  verifyAccessToken,
  createRefreshToken,
  createAccessToken,
};
