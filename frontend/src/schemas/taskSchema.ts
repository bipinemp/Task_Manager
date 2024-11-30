import { z } from "zod";

const TaskStatus = z.enum(["PENDING", "COMPLETED", "OVERDUE"], {
  required_error: "Status is required",
});
const TaskPriority = z.enum(["LOW", "MEDIUM", "HIGH"], {
  required_error: "Priority is required",
});

export const taskSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title is required" }),

  description: z.string().optional(),
  dueDate: z
    .string({ required_error: "DueDate is required" })
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "Invalid datetime format",
    }),
  status: TaskStatus,
  priority: TaskPriority,
});

export type TTask = z.infer<typeof taskSchema>;
