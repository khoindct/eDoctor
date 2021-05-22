import React, { useState } from "react";
import { enGB } from "date-fns/locale";
import { DateChangeCallBack, DatePickerCalendar } from "react-nice-dates";
// import "react-nice-dates/build/style.css";
import "./ReactNiceDate.scss";

interface IReactNiceDate {
  updateDateValue: (e: string) => void;
}

const ReactNiceDate: React.FC<IReactNiceDate> = ({ updateDateValue }) => {
  const [date, setDate] = useState<Date>();

  const handleOnDateChange: DateChangeCallBack = (event: any) => {
    setDate(event);
    updateDateValue(event.toUTCString());
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
