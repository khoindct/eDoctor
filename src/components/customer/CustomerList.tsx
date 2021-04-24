import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles, Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import MUIDataTable from "mui-datatables";

interface CustomerListProps {
  customers: {
    id: string;
    address: {
      country: string;
      state: string;
      city: string;
      street: string;
    };
    avatarUrl: string;
    email: string;
    name: string;
    phone: string;
  }[];
}

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
  editButton: {
    cursor: "pointer",
  },
}));

const datatableData = [
  {
    id: "1",
    name: "Joe James",
    company: "Example Inc.",
    city: "Yonkers",
    state: "NY",
  },
  {
    id: "2",
    name: "John Walsh",
    company: "Example Inc.",
    city: "Hartford",
    state: "CT",
  },
  {
    id: "3",
    name: "Bob Herm",
    company: "Example Inc.",
    city: "Tampa",
    state: "FL",
  },
  {
    id: "4",
    name: "James Houston",
    company: "Example Inc.",
    city: "Dallas",
    state: "TX",
  },
  {
    id: "5",
    name: "Prabhakar Linwood",
    company: "Example Inc.",
    city: "Hartford",
    state: "CT",
  },
  {
    id: "6",
    name: "Kaui Ignace",
    company: "Example Inc.",
    city: "Yonkers",
    state: "NY",
  },
  {
    id: "7",
    name: "Esperanza Susanne",
    company: "Example Inc.",
    city: "Hartford",
    state: "CT",
  },
  {
    id: "8",
    name: "Christian Birgitte",
    company: "Example Inc.",
    city: "Tampa",
    state: "FL",
  },
  {
    id: "9",
    name: "Meral Elias",
    company: "Example Inc.",
    city: "Hartford",
    state: "CT",
  },
  {
    id: "10",
    name: "Deep Pau",
    company: "Example Inc.",
    city: "Yonkers",
    state: "NY",
  },

  // ["10", "Deep Pau", "Example Inc.", "Yonkers", "NY"],
  // ["11", "Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
  // ["12", "Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
  // ["13", "Brigid Ankur", "Example Inc.", "Dallas", "TX"],
  // ["14", "Anna Siranush", "Example Inc.", "Yonkers", "NY"],
  // ["15", "Avram Sylva", "Example Inc.", "Hartford", "CT"],
  // ["16", "Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
  // ["17", "Gaston Festus", "Example Inc.", "Tampa", "FL"],
];

const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
  const classes = useStyles();
  let navigate = useNavigate();

  const columns = [
    {
      name: "id",
      options: {
        display: false,
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "company",
      label: "Company",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "city",
      label: "City",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "state",
      label: "State",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          const rowId = tableMeta.rowData[0];
          return (
            <EditIcon
              className={classes.editButton}
              onClick={() => navigate(`/app/customers/${rowId}/edit`)}
            />
          );
        },
      },
    },
  ];

  return (
    <React.Fragment>
      Tables
      <Grid container spacing={4} className={classes.root}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Employee List"
            data={datatableData}
            columns={columns}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CustomerList;
