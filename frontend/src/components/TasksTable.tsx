import { ChevronLeft, ChevronRight, Edit, Loader2, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTask, getAllTasks } from "../apis/tasks/tasks";
import { useState } from "react";
import { PaginatedTasks } from "../types/types";
import { formatDate } from "../utils/formatDate";
import { Badge } from "./Badge";
import { formatDateForInput } from "../utils/formatDateForInput";
import EditTaskForm from "./EditTaskForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import toast from "react-hot-toast";

type Props = {
  status: string | undefined;
  title: string | undefined;
};

const TasksTable = ({ title, status }: Props) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedData, setEditedData] = useState({
    id: "",
    title: "",
    description: "",
    dueDate: "",
    status: "",
    priority: "",
  });

  const { data, isPending } = useQuery<PaginatedTasks>({
    queryKey: ["tasks", page, title, status],
    queryFn: () => getAllTasks(page, 10, title, status),
  });

  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteTask,
    onSettled(data: any) {
      if (data.status === 200) {
        toast.success("Task Deleted Successfully.");
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      } else {
        toast.error("Something went wrong, Try again later.");
      }
    },
  });

  const prevPage = () => setPage(page! - 1);
  const nextPage = () => setPage(page! + 1);

  return (
    <>
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent
          onCloseAutoFocus={() => {
            setEditedData({
              id: "",
              title: "",
              description: "",
              dueDate: "",
              status: "",
              priority: "",
            });
          }}
          className="sm:max-w-[425px]"
        >
          <DialogHeader>
            <DialogTitle>Update Task</DialogTitle>
          </DialogHeader>

          <EditTaskForm
            editedData={editedData}
            setOpenEditDialog={setOpenEditDialog}
          />
        </DialogContent>
      </Dialog>

      <div className="bg-white w-full relative overflow-hidden rounded-md shadow border border-input">
        <div className="w-full table-wrapper overflow-x-auto">
          <table className="relative w-full text-left">
            <thead className="border-b border-t bg-gray-50 uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Task
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Priority
                </th>
                <th scope="col" className="px-6 py-3">
                  DueDate
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="w-full opacity-80">
              {data?.tasks?.map(
                ({ id, title, description, status, priority, dueDate }) => (
                  <tr
                    key={id}
                    className="text-sm border-b odd:bg-white even:bg-gray-50"
                  >
                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {title}
                    </td>
                    <td scope="row" className="whitespace-nowrap px-6 py-4">
                      <Badge status={status} />
                    </td>
                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {priority}
                    </td>
                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {formatDate(dueDate)}
                    </td>

                    <td
                      scope="row"
                      className="flex items-center justify-center gap-x-3 whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      <Button
                        onClick={() => {
                          setOpenEditDialog(true);
                          setEditedData({
                            id,
                            title,
                            description,
                            status,
                            priority,
                            dueDate: formatDateForInput(dueDate),
                          });
                        }}
                        size={"icon"}
                      >
                        <Edit className="size-5" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button variant={"outline"} size={"icon"}>
                            <Trash
                              className="size-5 text-destructive"
                              strokeWidth={3}
                            />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your task.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => mutate(id)}>
                              {isDeleting ? (
                                <span>
                                  <Loader2 className="animate-spin size-5" />{" "}
                                  Deleting...
                                </span>
                              ) : (
                                "Delete"
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {isPending && (
          <div className="mb-3 mt-6 w-full flex items-center justify-center">
            <Loader2 className="size-10 animate-spin" />
          </div>
        )}

        {data?.tasks?.length === 0 && (
          <h3 className="w-full text-destructive font-bold text-center py-4">
            Currently, no tasks found.
          </h3>
        )}

        {data?.tasks && data?.tasks?.length > 0 && (
          <div className="mt-5 w-full flex items-center gap-x-2 justify-between sm:justify-end py-4 px-2 place-self-end justify-self-end">
            <Button
              onClick={prevPage}
              disabled={page === 1}
              className="flex items-center gap-x-2"
            >
              <ChevronLeft />
              <span>Prev</span>
            </Button>

            <p>
              {page}/{data?.pagination.totalPages}
            </p>

            <Button
              onClick={nextPage}
              disabled={page === data?.pagination.totalPages}
              className="flex items-center gap-x-2"
            >
              <span>Next</span>
              <ChevronRight />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default TasksTable;
