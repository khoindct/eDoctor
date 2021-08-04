import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

const transformToNumber = (date: MaterialUiPickersDate) => {
  return date && date.getHours() * 60 + date.getMinutes();
};

const transformNumberToTime = (hour: (number | null)[]) => {
  const startTime = hour[0]!;
  const endTime = hour[1]!;

  if (!startTime && !endTime) return "Open 24 hours";

  return `${String(startTime / 60).padStart(2, "0")}:${String(
    startTime % 60
  ).padStart(2, "0")} - ${String(endTime / 60).padStart(2, "0")}:${String(
    endTime % 60
  ).padStart(2, "0")}`;
};

export { transformToNumber, transformNumberToTime };
