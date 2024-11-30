import { cn } from "../lib/utils";

type BadgeProps = {
  status: "PENDING" | "COMPLETED" | "OVERDUE";
  className?: string;
};

export function Badge({ status, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
        {
          "bg-yellow-50 text-yellow-800 ring-yellow-600/20":
            status === "PENDING",
          "bg-green-50 text-green-800 ring-green-600/20":
            status === "COMPLETED",
          "bg-red-50 text-red-800 ring-red-600/20": status === "OVERDUE",
        },
        className
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
