import express, { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  getTaskCounts,
  updateTask,
} from "../controllers/taskController";
import { protect } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.route("/").post(protect, createTask);
router.route("/").get(protect, getAllTasks);
router.route("/count").get(protect, getTaskCounts);
router.route("/:taskId").get(protect, getTask);
router.route("/:taskId").delete(protect, deleteTask);
router.route("/:taskId").put(protect, updateTask);

export default router;
