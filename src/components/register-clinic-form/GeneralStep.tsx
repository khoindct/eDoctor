import React, { Fragment, useState } from "react";
import { IFormStep } from "./controls.model";
import CustomTextField from "../CustomTextField";
import { Controller } from "react-hook-form";
import CustomButton from "../CustomButton";
import { Box, Button, Grid } from "@material-ui/core";
import "./GeneralStep.scss";

// Destructuring props
const GeneralStep: React.FC<IFormStep> = ({
  handleNext,
  control,
  setValue,
}) => {
  const [coverImageFile, setCoverImageFile] = useState<string>();
  // Check if all values are not empty or if there are some error
  const isValid = true;

  const handleChange = (event: any) => {
    setValue && setValue("coverImage", event.target.files[0]);
    setCoverImageFile(window.URL.createObjectURL(event.target.files[0]));
  };

  return (
    <Fragment>
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
              <Button variant="contained" color="secondary" component="span">
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
        <Box ml="auto" mt={2} mr={2}>
          <CustomButton callback={isValid ? handleNext : undefined}>
            Next
          </CustomButton>
        </Box>
      </Grid>
    </Fragment>
  );
};

export default GeneralStep;
