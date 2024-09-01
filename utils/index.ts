import dayjs from "dayjs";

export const getRelativeDate = (date: string): string => {
  const today = dayjs().startOf("day");
  const targetDate = dayjs(date).startOf("day");
  const diffDays = today.diff(targetDate, "day");

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else {
    return `${diffDays} days ago`;
  }
};
