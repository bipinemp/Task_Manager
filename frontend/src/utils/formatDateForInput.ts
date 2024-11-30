export const formatDateForInput = (isoDate: string) => {
  const localDate = new Date(isoDate);

  const formattedDate = localDate.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const [date, time] = formattedDate.split(", ");
  const [month, day, year] = date.split("/");
  const [hour, minute] = time.split(":");

  return `${year}-${month}-${day}T${hour}:${minute}`;
};
