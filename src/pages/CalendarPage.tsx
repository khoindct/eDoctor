import Calendar from "../components/calendar/Calendar";
import Page from "../components/Page";

const CalendarPage: React.FC = () => {
  return (
    <Page className="" title="Appointments">
      <div style={{ width: "90%", margin: "auto" }}>
        <Calendar />
      </div>
    </Page>
  );
};

export default CalendarPage;
