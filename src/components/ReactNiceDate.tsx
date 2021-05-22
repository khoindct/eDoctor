import React, { useState } from "react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import {
  DateChangeCallBack,
  DatePickerCalendar,
  useDateInput,
} from "react-nice-dates";
// import "react-nice-dates/build/style.css";
import "./ReactNiceDate.scss"

const ReactNiceDate: React.FC = () => {
  const [date, setDate] = useState<Date>();
  const inputProps = useDateInput({
    date,
    format: "yyyy-MM-dd",
    locale: enGB,
    onDateChange: setDate,
  });
  const handleOnDateChange: DateChangeCallBack = (event: any) => {
    setDate(event);
  };

  return (
    <div className="date-root">      
      <DatePickerCalendar
        date={date}
        onDateChange={handleOnDateChange}
        locale={enGB}
      />
    </div>
  );
};

export default ReactNiceDate;
