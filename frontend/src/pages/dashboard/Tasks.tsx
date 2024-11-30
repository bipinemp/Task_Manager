import TasksTable from "@/components/TasksTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDebounce } from "@/hooks/useDebounce";

import { PlusCircle } from "lucide-react";
import { useState } from "react";
import TaskForm from "@/components/TaskForm";

const Tasks = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const [filterState, setFilterState] = useState<{
    status: string | undefined;
    title: string | undefined;
  }>({ status: undefined, title: undefined });

  const debouncedTitle: string | undefined = useDebounce(
    filterState.title,
    200
  );

  return (
    <section className="relative flex flex-col gap-y-5 mb-20">
      <div className="flex items-center justify-between flex-col gap-y-1 sm:flex-row">
        <h1 className="opacity-70">Tasks</h1>
        <div className="flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Input
              value={filterState.title}
              onChange={(e) =>
                setFilterState((prev) => ({ ...prev, title: e.target.value }))
              }
              name="title"
              placeholder="Search task..."
            />

            <Select
              value={filterState.status}
              onValueChange={(e) =>
                setFilterState((prev) => ({
                  ...prev,
                  status: e,
                }))
              }
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="STATUS" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="PENDING">PENDING</SelectItem>
                <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                <SelectItem value="OVERDUE">OVERDUE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="size-5" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add task</DialogTitle>
              </DialogHeader>

              <TaskForm setOpenDialog={setOpenDialog} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <TasksTable
        title={debouncedTitle}
        status={filterState.status === "All" ? undefined : filterState.status}
      />
    </section>
  );
};

export default Tasks;
