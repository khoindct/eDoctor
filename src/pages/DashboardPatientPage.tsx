import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import Page from "../components/Page";
import "./DashboardPatientPage.scss";
import AppointmentList from "../components/appointment/AppointmentList";
import CustomTextField from "../components/CustomTextField";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="patient-tab-panel"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: any) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
};

const DashboardPatientPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Page className="dashboard-patient-page" title="Dashboard">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        orientation="vertical"
      >
        <Tab label="GENERAL" className="tab__label" {...a11yProps(0)} />
        <Tab label="APPOINTMENTS" className="tab__label" {...a11yProps(1)} />
        <Tab label="CHANGE PASSWORD" className="tab__label" {...a11yProps(2)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <div className="patient-profile">
          <Card className="profile">
            <CardContent className="profile__action">
              <div className="profile__info">
                <div className="profile__avatar--border">
                  <Avatar
                    alt="Remy Sharp"
                    src="../assets/images/default-avatar.jpg"
                    className="profile__avatar"
                  />
                </div>
                <Typography
                  className="profile__name"
                  variant="body2"
                  color="textSecondary"
                  component="h6"
                >
                  Jane Rotanson
                </Typography>
              </div>
            </CardContent>
            <CardActions>
              <Button
                className="profile__button"
                size="medium"
                color="primary"
                fullWidth
              >
                Remove Picture
              </Button>
            </CardActions>
          </Card>
          <div className="content">
            <form>
              <Card>
                <CardHeader
                  title="Profile"
                  classes={{
                    title: "profile__title",
                  }}
                />
                <Divider />
                <CardContent>
                  <div className="profile__form--input">
                    <CustomTextField label="Name" />
                    <CustomTextField label="Email" />
                    <CustomTextField label="Phone" />
                  </div>
                </CardContent>
                <Divider />
                <div className="profile__form--action">
                  <Button
                    className="profile__button"
                    size="medium"
                    color="primary"
                    variant="contained"
                  >
                    Save Changes
                  </Button>
                </div>
              </Card>
            </form>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AppointmentList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <form>
          <Card>
            <CardHeader
              title="Security"
              classes={{
                title: "profile__title",
              }}
            />
            <Divider />
            <CardContent>
              <div className="profile__form--input">
                <CustomTextField label="Old Password" />
                <CustomTextField label="New Password" />
                <CustomTextField label="Confirm Password" />
              </div>
            </CardContent>
            <Divider />
            <div className="profile__form--action">
              <Button
                className="profile__button"
                size="medium"
                color="primary"
                variant="contained"
              >
                Save Changes
              </Button>
            </div>
          </Card>
        </form>
      </TabPanel>
    </Page>
  );
};

export default DashboardPatientPage;
