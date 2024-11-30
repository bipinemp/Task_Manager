import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import cookieParser from "cookie-parser";
import scheduleOverdueTasks from "./jobs/schedulingTasks";

const app: Express = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:4173",
    credentials: true,
  })
);

// Cron Job
scheduleOverdueTasks();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is Working...");
});

// Server setup
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
