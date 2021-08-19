import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

const transformToNumber = (date: MaterialUiPickersDate) => {
  return date && date.getHours() * 60 + date.getMinutes();
};

const transformNumberToTime = (hour: (number | null)[]) => {
  if (!hour.length) return "Closed";

  const startTime = hour[0]!;
  const endTime = hour[1]!;
  if (!startTime && !endTime) return "Open 24 hours";

  return `${String(startTime / 60).padStart(2, "0")}:${String(
    startTime % 60
  ).padStart(2, "0")} - ${String(endTime / 60).padStart(2, "0")}:${String(
    endTime % 60
  ).padStart(2, "0")}`;
};

const formatTime = (num: number) => {
  return `${Math.floor(num / 60).toLocaleString(undefined, {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}:${(num % 60).toLocaleString(undefined, {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}`;
};

export { transformToNumber, transformNumberToTime, formatTime };
