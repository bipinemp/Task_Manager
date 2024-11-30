import { getTasksCount } from "../../apis/tasks/tasks";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

const Dashboard = () => {
  const { data, isPending } = useQuery({
    queryKey: ["tasksCount"],
    queryFn: () => getTasksCount(),
  });

  if (isPending) {
    return <Loader className="animate-spin size-10" />;
  }

  return (
    <div className="flex items-center gap-x-5">
      <div className="w-[150px] h-[150px] rounded-md shadow bg-zinc-50 border border-primary/30 flex flex-col gap-y-2 items-center justify-center">
        <h2>Pending </h2>
        <h1 className="opacity-80">{data.counts.pending}</h1>
      </div>
      <div className="w-[150px] h-[150px] rounded-md shadow bg-zinc-50 border border-primary/30 flex flex-col gap-y-2 items-center justify-center">
        <h2>Completed </h2>
        <h1 className="opacity-80">{data.counts.completed}</h1>
      </div>
      <div className="w-[150px] h-[150px] rounded-md shadow bg-zinc-50 border border-primary/30 flex flex-col gap-y-2 items-center justify-center">
        <h2>Overdue </h2>
        <h1 className="opacity-80">{data.counts.overdue}</h1>
      </div>
    </div>
  );
};

export default Dashboard;
