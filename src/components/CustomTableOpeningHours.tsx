import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { transformNumberToTime } from "../helpers/datetime-helper";
import "./CustomTableOpeningHours.scss";

interface ICustomTableOpeningHours {
  workingHours: any[];
}

const createDateData = (
  dayOfWeek: number,
  hours: (number | null)[][]
): { name: string; hours: (number | null)[][] } => {
  const dataMap = new Map([
    [0, "Sunday"],
    [1, "Monday"],
    [2, "Tuesday"],
    [3, "Wednesday"],
    [4, "Thursday"],
    [5, "Friday"],
    [6, "Saturday"],
  ]);
  return {
    name: dataMap.get(dayOfWeek)!,
    hours,
  };
};

const CustomTableOpeningHours: React.FC<ICustomTableOpeningHours> = ({
  workingHours,
}) => {
  const [dataRows, setDataRows] =
    useState<{ name: string; hours: (number | null)[][] }[]>();

  useEffect(() => {
    const result = workingHours.map((_, index) =>
      createDateData(index, workingHours[index])
    );
    setDataRows(result);
  }, [workingHours]);

  return (
    <Table className="table" aria-label="customized table">
      <TableHead>
        <TableRow>
          <TableCell classes={{ body: "table__body", head: "table__head" }}>
            Opening Hours
          </TableCell>
          <TableCell
            classes={{ body: "table__body", head: "table__head" }}
          ></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dataRows &&
          dataRows.map((row) => (
            <TableRow className="table__row" key={row.name}>
              <TableCell
                classes={{ body: "table__body" }}
                component="th"
                scope="row"
              >
                {row.name}
              </TableCell>
              <TableCell
                className="table__right-column"
                classes={{ body: "table__body" }}
                align="right"
              >
                {row.hours.length
                  ? row.hours.map((hour, index) => (
                      <span key={index}>{transformNumberToTime(hour)}</span>
                    ))
                  : "Closed"}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default CustomTableOpeningHours;
