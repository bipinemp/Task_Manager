import cron from "node-cron";
import prisma from "../utils/prisma";
import logger from "../utils/logger";

const scheduleOverdueTasks = async () => {
  cron.schedule("0 * * * *", async () => {
    try {
      const overdueTasks = await prisma.task.findMany({
        where: {
          dueDate: {
            lt: new Date(),
          },
        },
      });

      if (overdueTasks.length === 0) {
        logger.info("No overdue tasks found.");
        return;
      }

      overdueTasks.forEach((task) => {
        logger.info(`Task [${task.title}] is overdue.`);
      });

      const updatedTasks = await prisma.task.updateMany({
        where: {
          id: {
            in: overdueTasks.map((task) => task.id),
          },
        },
        data: {
          status: "OVERDUE",
        },
      });

      logger.info(`Updated ${updatedTasks.count} overdue tasks.`);
    } catch (error: any) {
      logger.error(`Error checking overdue tasks: ${error.message}`);
    }
  });
};

export default scheduleOverdueTasks;
