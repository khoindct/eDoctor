import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from "@material-ui/core";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomButton from "../components/CustomButton";
import CustomTextField from "../components/CustomTextField";
import SearchLocation from "../components/map/SearchLocation";
import Page from "../components/Page";
import { IFormInput } from "../components/register-clinic-form/controls.model";
import "./DoctorSettingPage.scss";

const DoctorSettingPage: React.FC = () => {
  const { control, setValue } = useForm<IFormInput>();
  const [coverImageFile, setCoverImageFile] = useState<string>();
  const handleChange = (event: any) => {
    setValue && setValue("coverImage", event.target.files[0]);
    setCoverImageFile(window.URL.createObjectURL(event.target.files[0]));
  };

  return (
    <Page className="" title="Settings">
      <Box mt={5} />
      <Card>
        <CardHeader
          title="Clinic Information"
          classes={{
            title: "profile__title",
          }}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <h6 className="clinic-cover-image-title">Cover image:</h6>
            </Grid>
            <Grid item xs={9}>
              <Grid
                container
                direction="column"
                classes={{ root: "cover-image-container" }}
              >
                {coverImageFile && (
                  <img
                    src={coverImageFile}
                    alt="Clinic cover"
                    className="clinic-cover-image"
                  />
                )}
                <input
                  style={{ display: "none" }}
                  id="cover-image-file"
                  type="file"
                  onChange={handleChange}
                />

                <label htmlFor="cover-image-file">
                  <Button
                    variant="contained"
                    color="secondary"
                    component="span"
                  >
                    Upload
                  </Button>
                </label>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CustomTextField label="Clinic Name" {...field} />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CustomTextField label="Clinic Phone" {...field} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField label="Your email" {...field} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    label="Description"
                    isMultiline={true}
                    rows={6}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <SearchLocation />
            </Grid>
            <Grid item xs={12}>
              Google Map
              {/* <Map /> */}
            </Grid>
            <Box ml="auto" mt={2} mr={2}>
              <CustomButton>Save Changes</CustomButton>
            </Box>
          </Grid>
        </CardContent>
      </Card>
      <Box mb={5} />
    </Page>
  );
};

export default DoctorSettingPage;
