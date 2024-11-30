import jwt from "jsonwebtoken";

import prisma from "../utils/prisma";
import { NextFunction, Request, Response } from "express";

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      const user = await prisma.user.findFirst({
        where: { id: decoded.userId },
        select: { id: true },
      });

      if (!user) {
        res.status(401).json({ message: "Not authorized, user not found" });
        return;
      }

      // @ts-ignore
      req.userId = user.id;
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, invalid token." });
      throw new Error("Not authorized , invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized , no token");
  }
};

export { protect };
