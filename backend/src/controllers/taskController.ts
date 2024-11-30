import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { TaskStatus } from "@prisma/client";

export const createTask = async (req: Request, res: Response) => {
  const { title, description, dueDate, status, priority } = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate).toISOString(),
        status,
        priority,
        // @ts-ignore
        userId: req.userId as string,
      },
    });

    if (!task) {
      res.status(400).json({ message: "Task not created, Try again later." });
      return;
    }

    res.status(201).json({ message: "Task Created successfully.", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error, Try again later." });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  const { title, status, page = 1, pageSize = 10 } = req.query;

  const skip = (Number(page) - 1) * Number(pageSize);
  const take = Number(pageSize);

  try {
    const tasks = await prisma.task.findMany({
      where: {
        // @ts-ignore
        userId: req.userId as string,
        title: title
          ? { contains: String(title), mode: "insensitive" }
          : undefined,
        status: status ? (status as TaskStatus) : undefined,
      },
      skip,
      take,
      orderBy: { createdAt: "desc" },
    });

    const totalTasks = await prisma.task.count({
      where: {
        // @ts-ignore
        userId: req.userId as string,
        title: title
          ? { contains: String(title), mode: "insensitive" }
          : undefined,
        status: status ? (status as TaskStatus) : undefined,
      },
    });

    const totalPages = Math.ceil(totalTasks / Number(pageSize));

    if (!tasks) {
      res.status(400).json({ message: "No tasks found, Try again later." });
      return;
    }

    res.status(200).json({
      message: "All Tasks retrieved successfully.",
      tasks,
      pagination: {
        currentPage: Number(page),
        totalPages,
        pageSize: Number(pageSize),
        totalTasks,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error, Try again later." });
  }
};

export const getTaskCounts = async (req: Request, res: Response) => {
  try {
    // Counts for each status type (Pending, Overdue, and Completed)
    const pendingCount = await prisma.task.count({
      where: {
        //@ts-ignore
        userId: req.userId as string,
        status: "PENDING",
      },
    });

    const completedCount = await prisma.task.count({
      where: {
        //@ts-ignore
        userId: req.userId as string,
        status: "COMPLETED",
      },
    });

    const overdueCount = await prisma.task.count({
      where: {
        //@ts-ignore
        userId: req.userId as string,
        status: "OVERDUE",
      },
    });

    res.status(200).json({
      message: "Task counts retrieved successfully.",
      counts: {
        pending: pendingCount,
        completed: completedCount,
        overdue: overdueCount,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error, Try again later." });
  }
};

export const getTask = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;

  try {
    const task = await prisma.task.findFirst({
      // @ts-ignore
      where: { id: taskId },
    });

    if (!task) {
      res.status(400).json({ message: "No task found, Try again later." });
      return;
    }

    // @ts-ignore
    if (task.userId !== req.userId) {
      res
        .status(401)
        .json({ message: "You are not authorized to view this task." });
      return;
    }

    res.status(200).json({ message: "Task retrieved successfully.", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error, Try again later." });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;

  try {
    const task = await prisma.task.findFirst({ where: { id: taskId } });

    if (!task) {
      res.status(400).json({ message: "Task not found, Try again later." });
      return;
    }

    await prisma.task.delete({ where: { id: taskId } });

    res.status(200).json({ message: "Task Deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error, Try again later." });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const { title, description, dueDate, status, priority } = req.body;

  try {
    const task = await prisma.task.findFirst({ where: { id: taskId } });

    if (!task) {
      res.status(400).json({ message: "Task not found, Try again later." });
      return;
    }

    // @ts-ignore
    if (task.userId !== req.userId) {
      res
        .status(401)
        .json({ message: "You are not authorized to update this task." });
      return;
    }

    const updatedTask = await prisma.task.update({
      // @ts-ignore
      where: { id: taskId },
      data: {
        title,
        description,
        dueDate: new Date(dueDate).toISOString(),
        status,
        priority,
      },
    });

    res
      .status(200)
      .json({ message: "Task Updated successfully.", updatedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error, Try again later." });
  }
};
