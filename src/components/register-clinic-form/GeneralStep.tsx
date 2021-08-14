import React, { Fragment, useState } from "react";
import { IFormStep } from "./controls.model";
import CustomTextField from "../CustomTextField";
import { Controller } from "react-hook-form";
import CustomButton from "../CustomButton";
import { Box, Button, CircularProgress, Grid } from "@material-ui/core";
import "./GeneralStep.scss";
import { clinicNameRegex, emailRegex } from "../../helpers/regex";
import { useQuery } from "react-query";
import api from "../../api";
import CustomAutoComplete from "../CustomAutoComplete";

// Destructuring props
const GeneralStep: React.FC<IFormStep> = ({
  handleNext,
  control,
  setValue,
  errors,
}) => {
  const axios = api();
  const [coverImageFile, setCoverImageFile] = useState<string>();
  const [specIds, setSpecIds] = useState<any>({});
  // Check if all values are not empty or if there are some error
  const isValid = true;

  const getSpecialists = async () => {
    const response = await axios.get("/specialists");
    const data = response.data.data.data;
    const specialistIds: any = {};
    const specialistNames: string[] = [];
    data.forEach((specialist: any) => {
      const { name, _id } = specialist;
      specialistIds[name] = _id;
      specialistNames.push(name);
    });
    setSpecIds(specialistIds);

    return specialistNames;
  };

  let { data: specialists, isLoading } = useQuery(
    "specialistData",
    getSpecialists,
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  const handleChange = (event: any) => {
    setValue && setValue("coverImage", event.target.files[0]);
    setCoverImageFile(window.URL.createObjectURL(event.target.files[0]));
  };

  const handleSelectSpecialists = (data: string[]) => {
    const specialistIds: string[] = [];
    data.forEach((name) => {
      specialistIds.push(specIds[name]);
    });
    setValue && setValue("specialists", JSON.stringify(specialistIds));
  };

  if (isLoading) {
    return <CircularProgress color="secondary" />;
  }

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
            rules={{
              required: "Clinic name cannot be empty",
              pattern: {
                value: clinicNameRegex,
                message: "Clinic name cannot contain special characters",
              },
            }}
            render={({ field }) =>
              errors.name ? (
                <CustomTextField
                  label="Clinic Name"
                  error={true}
                  helperText={errors.name.message}
                  {...field}
                />
              ) : (
                <CustomTextField label="Clinic Name" {...field} />
              )
            }
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
          <CustomAutoComplete
            options={specialists!}
            handleChange={handleSelectSpecialists}
            label="Specialist"
            placeholder="Select your clinic specialist"
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              pattern: { value: emailRegex, message: "Invalid email" },
              required: "Email cannot be empty",
            }}
            render={({ field }) =>
              errors.email ? (
                <CustomTextField
                  error={true}
                  helperText={errors.email?.message}
                  label="Email Address"
                  {...field}
                />
              ) : (
                <CustomTextField label="Email Address" {...field} />
              )
            }
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
