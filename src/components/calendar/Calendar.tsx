import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { appointments } from "./data/calendar-fake-data";
import ExternalViewSwitcher from "./ViewSwitching";

const Calendar: React.FC = () => {
  const [data] = useState<any>(appointments);
  const [currentViewName, setCurrentViewName] = useState<any>("Month");

  const currentViewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentViewName((prevState: any) => (prevState = e.target.value));
  };

  return (
    <React.Fragment>
      <ExternalViewSwitcher
        currentViewName={currentViewName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          currentViewNameChange(e)
        }
      />

      <Paper>
        <Scheduler data={data}>
          <ViewState
            defaultCurrentDate="2018-07-25"
            currentViewName={currentViewName}
          />
          <WeekView startDayHour={10} endDayHour={19} />
          <MonthView />

          <Toolbar />
          <DateNavigator />

          <Appointments />
        </Scheduler>
      </Paper>
    </React.Fragment>
  );
};

export default Calendar;
