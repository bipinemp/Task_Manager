import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({ required_error: "Username is required" })
    .min(1, { message: "Username is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" })
    .min(8, { message: "Passwod of 8 characters required" }),
});

export type TRegister = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" }),
});

export type TLogin = z.infer<typeof loginSchema>;
