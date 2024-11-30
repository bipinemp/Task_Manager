import { Request, Response } from "express";
import prisma from "../utils/prisma";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userAlreadyExists = await prisma.user.findUnique({ where: { email } });

  if (userAlreadyExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (user) {
      res.status(201).json({ message: "Registered successfully" });
      return;
    } else {
      res.status(400).json({ message: "Something went wrong." });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(400).json({ message: "User doesn't exist." });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid credentials." });
      return;
    }

    const token = generateToken(res, user.id);

    res.status(200).json({
      message: "Logged In successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken: token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged Out successfully" });
};
