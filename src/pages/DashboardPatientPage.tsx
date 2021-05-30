import { useState } from "react";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import Page from "../components/Page";
import "./DashboardPatientPage.scss";
import AppointmentList from "../components/appointment/AppointmentList";
import CustomTextField from "../components/CustomTextField";
import api from "../api";
import { useMutation, useQuery } from "react-query";
import { Controller, useForm } from "react-hook-form";
import CustomModal from "../components/CustomModal";
import UpdatePassword from "../components/update-password";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface IUserFormInput {
  deleteAvatar?: string;
  avatar?: string;
  name?: string;
  email?: string;
  phone?: string;
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
  const axios = api();
  const [tabValue, setTabValue] = useState(0);
  const [modalSuccessOpen, setModalSuccessOpen] = useState<boolean>(false);
  const [modalErrorOpen, setModalErrorOpen] = useState<boolean>(false);
  const [userAvatar, setUserAvatar] = useState<string>();
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>();
  const { control, setValue, handleSubmit } = useForm<IUserFormInput>();

  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const getCurrentUser = async () => {
    const { data } = await axios.get("/users/current-user");
    const result = data.data;
    setCurrentUser(result);
    setUserAvatar(currentUser?.avatar?.url);

    if (currentUser) {
      setValue("name", currentUser?.name);
      setValue("email", currentUser?.email);
      setValue("phone", currentUser?.phone);
    }
    return result;
  };

  const { isLoading } = useQuery(["profileUser", currentUser], getCurrentUser, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  const mutationUpdateProfile = useMutation(
    (formData) => {
      return axios.put(`/users/${currentUser._id}`, formData);
    },
    {
      onSuccess: (data) => {
        const user = data.data.data.data;
        setCurrentUser(user);
        setUserAvatar(user?.avatar?.url);
        setBackdropOpen(false);
        setModalSuccessOpen(true);
      },
      onError: (error) => {
        console.error(error);
        setBackdropOpen(false);
        setModalErrorOpen(true);
      },
    }
  );

  const handleUploadAvatar = (event: any) => {
    setValue && setValue("avatar", event.target.files[0]);
    setUserAvatar(window.URL.createObjectURL(event.target.files[0]));
  };

  const handleRemoveAvatar = () => {
    setValue && setValue("deleteAvatar", currentUser?.avatar?.filename);
    setValue && setValue("avatar", undefined);
    setUserAvatar("");
  };

  function getFormData(object: any) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  }

  const handleUpdateUserSubmit = async (formData: IUserFormInput) => {
    setBackdropOpen(true);
    const data = getFormData(formData);
    mutationUpdateProfile.mutate(data as any);
  };

  return (
    <Page className="dashboard-patient-page" title="Dashboard">
      {modalSuccessOpen && (
        <CustomModal type="success" message="Successfully save changes" />
      )}
      {modalErrorOpen && (
        <CustomModal
          type="error"
          message="Something goes wrong. Please try again!"
        />
      )}
      <Backdrop className="backdrop" open={isLoading || backdropOpen}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
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

      <TabPanel value={tabValue} index={0}>
        <div className="patient-profile">
          <Card className="profile">
            <CardContent className="profile__action">
              <div className="profile__info">
                <div className="profile__avatar--border">
                  <Avatar
                    alt={currentUser?.name}
                    src={userAvatar}
                    className="profile__avatar"
                  />
                </div>
                <Typography
                  className="profile__name"
                  variant="body2"
                  color="textSecondary"
                  component="h6"
                >
                  {currentUser?.name}
                </Typography>
              </div>
            </CardContent>
            <CardActions>
              {userAvatar ? (
                <Button
                  className="profile__button"
                  size="medium"
                  color="secondary"
                  fullWidth
                  onClick={handleRemoveAvatar}
                >
                  Remove Avatar
                </Button>
              ) : (
                <>
                  <input
                    style={{ display: "none" }}
                    id="cover-image-file"
                    type="file"
                    onChange={handleUploadAvatar}
                  />
                  <label htmlFor="cover-image-file" style={{ width: "100%" }}>
                    <Button
                      className="profile__button"
                      size="medium"
                      color="secondary"
                      component="span"
                      fullWidth
                    >
                      Upload Avatar
                    </Button>
                  </label>
                </>
              )}
            </CardActions>
          </Card>
          <div className="content">
            <form onSubmit={handleSubmit(handleUpdateUserSubmit)}>
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
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          label="Name"
                          value={currentUser?.name}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="email"
                      control={control}
                      defaultValue={currentUser?.email || ""}
                      render={({ field }) => (
                        <CustomTextField label="Email" {...field} />
                      )}
                    />
                    <Controller
                      name="phone"
                      control={control}
                      defaultValue={currentUser?.phone || ""}
                      render={({ field }) => (
                        <CustomTextField label="Phone" {...field} />
                      )}
                    />
                  </div>
                </CardContent>
                <Divider />
                <div className="profile__form--action">
                  <Button
                    type="submit"
                    className="profile__button"
                    size="medium"
                    color="secondary"
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
      <TabPanel value={tabValue} index={1}>
        <AppointmentList />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <UpdatePassword />
      </TabPanel>
    </Page>
  );
};

export default DashboardPatientPage;
