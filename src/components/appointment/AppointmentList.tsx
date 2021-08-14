import { Chip, Typography } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import "./AppointmentList.scss";
import moment from "moment";
import { formatTime } from "../../helpers/datetime-helper";

interface IAppointmentList {
  appointments: any[];
}

const columns = [
  {
    name: "clinic",
    label: "Clinic",
    options: {
      filter: true,
      sort: false,
      setCellHeaderProps: (value: any) => {
        return {
          style: {
            fontSize: "1.5rem",
          },
        };
      },
    },
  },
  {
    name: "appDate",
    label: "Appointment Date",
    options: {
      filter: true,
      sort: false,
      setCellHeaderProps: (value: any) => {
        return {
          style: {
            fontSize: "1.5rem",
          },
        };
      },
    },
  },
  {
    name: "bookedDate",
    label: "Booking Date",
    options: {
      filter: true,
      sort: false,
      setCellHeaderProps: (value: any) => {
        return {
          style: {
            fontSize: "1.5rem",
          },
        };
      },
    },
  },
  {
    name: "bookedTime",
    label: "Booking Time",
    options: {
      filter: true,
      sort: false,
      setCellHeaderProps: (value: any) => {
        return {
          style: {
            fontSize: "1.5rem",
          },
        };
      },
    },
  },
  {
    name: "status",
    label: "Status",
    options: {
      filter: true,
      sort: false,
      setCellHeaderProps: (value: any) => {
        return {
          style: {
            fontSize: "1.5rem",
          },
        };
      },
    },
  },
];

const AppointmentList: React.FC<IAppointmentList> = ({ appointments }) => {
  const getDataList = (list: any[]) => {
    if (!list?.length) {
      return [];
    }

    const chipStyle = new Map([
      ["pending", "chip-pending"],
      ["approved", "chip-success"],
      ["denied", "chip-cancel"],
    ]);

    const data = list.map((appointment) => {
      const { bookedDate, bookedTime, clinic, status, createdAt } = appointment;
      return {
        clinic: (
          <Typography variant="h5" component="span">
            {clinic.name}
          </Typography>
        ),
        appDate: (
          <Typography variant="h5" component="span">
            {moment(createdAt).format("DD-MM-YYYY")}
          </Typography>
        ),
        bookedDate: (
          <Typography variant="h5" component="span">
            {moment(bookedDate).format("DD-MM-YYYY")}
          </Typography>
        ),
        bookedTime: (
          <Typography variant="h5">{formatTime(bookedTime)}</Typography>
        ),
        status: (
          <Chip
            label={status[0].toUpperCase() + status.slice(1)}
            classes={{ root: chipStyle.get(status) }}
          />
        ),
      };
    });
    return data;
  };

  const dataList = getDataList(appointments);

  const data = appointments.map((appointment) => {
    const { bookedDate, bookTime, clinic, status, createdAt } = appointment;
    return [
      {
        clinic: (
          <Typography variant="h5" component="span">
            clinic.name
          </Typography>
        ),
        appDate: (
          <Typography variant="h5" component="span">
            {moment(createdAt).format("DD-MM-YYYY")}
          </Typography>
        ),
        bookDate: (
          <Typography variant="h5" component="span">
            {moment(clinic.bookedDate).format("DD-MM-YYYY")}
          </Typography>
        ),
        status: <Chip label="Confirm" classes={{ root: "chip-success" }} />,
      },
    ];
  });

  return (
    <MUIDataTable
      title={"Appointment List"}
      data={dataList}
      columns={columns}
      options={{
        filterType: "textField",
        download: "false",
      }}
    />
  );
};

export default AppointmentList;
