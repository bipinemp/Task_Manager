import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { taskSchema, TTask } from "../schemas/taskSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../apis/tasks/tasks";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const TaskForm = ({
  setOpenDialog,
}: {
  setOpenDialog: React.Dispatch<boolean>;
}) => {
  const queryClient = useQueryClient();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TTask>({
    resolver: zodResolver(taskSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createTask,
    onSettled(data: any) {
      if (data.status === 201) {
        toast.success("Task Created Successfully.");
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        setOpenDialog(false);
      } else {
        toast.error("Something went wrong, Try again later.");
      }
    },
  });

  const onSubmit = (data: TTask) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="title">* Title</Label>
        <Input
          {...register("title")}
          placeholder="Enter title..."
          id="title"
          className={cn("py-5", {
            "border-destructive": errors?.title?.message,
          })}
        />
        {errors?.title?.message && (
          <span className="text-destructive text-xs font-semibold">
            * {errors?.title?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          {...register("description")}
          placeholder="Enter description..."
          id="description"
          className={cn("py-5", {
            "border-destructive": errors?.description?.message,
          })}
        />
        {errors?.description?.message && (
          <span className="text-destructive text-xs font-semibold">
            * {errors?.description?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-y-2">
        <Label htmlFor="duedate">* Due Date</Label>
        <Input
          {...register("dueDate")}
          placeholder="Enter DueDate..."
          id="duedate"
          type="datetime-local"
          className={cn("py-5", {
            "border-destructive": errors?.dueDate?.message,
          })}
        />
        {errors?.dueDate?.message && (
          <span className="text-destructive text-xs font-semibold">
            * {errors?.dueDate?.message}
          </span>
        )}
      </div>

      <div className="flex items-center gap-x-5">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="status">* Status</Label>

          <Controller
            name="status"
            control={control}
            render={({ field }) => {
              return (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    id="status"
                    className={cn("w-[150px]", {
                      "border-destructive": errors?.status?.message,
                    })}
                  >
                    <SelectValue placeholder="STATUS" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">PENDING</SelectItem>
                    <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                    <SelectItem value="OVERDUE">OVERDUE</SelectItem>
                  </SelectContent>
                </Select>
              );
            }}
          />

          {errors?.status?.message && (
            <span className="text-destructive text-xs font-semibold">
              * {errors?.status?.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="priority">* Priority</Label>

          <Controller
            name="priority"
            control={control}
            render={({ field }) => {
              return (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    id="priority"
                    className={cn("w-[150px]", {
                      "border-destructive": errors?.priority?.message,
                    })}
                  >
                    <SelectValue placeholder="PRIORITY" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">LOW</SelectItem>
                    <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                    <SelectItem value="HIGH">HIGH</SelectItem>
                  </SelectContent>
                </Select>
              );
            }}
          />

          {errors?.priority?.message && (
            <span className="text-destructive text-xs font-semibold">
              * {errors?.priority?.message}
            </span>
          )}
        </div>
      </div>

      <Button type="submit">
        {isPending ? (
          <span className="flex items-center gap-x-2">
            <Loader2 className="animate-spin size-5" /> Creating...
          </span>
        ) : (
          "Create Task"
        )}
      </Button>
    </form>
  );
};

export default TaskForm;
