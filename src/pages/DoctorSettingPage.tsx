import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
} from "@material-ui/core";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../api";
import CustomButton from "../components/CustomButton";
import CustomModal from "../components/CustomModal";
import CustomTextField from "../components/CustomTextField";
import SearchLocation from "../components/map/SearchLocation";
import Map from "../components/map/Map";
import Page from "../components/Page";
import { clinicNameRegex } from "../helpers/regex";
import { useTypedSelector } from "../hooks/useTypedSelector";
import "./DoctorSettingPage.scss";
import CustomAutoComplete from "../components/CustomAutoComplete";

interface IClinicDetailInput {
  coverImage: File | undefined;
  deleteCoverImage: string;
  name: string;
  email: string;
  address: string;
  specialists: string;
  description: string;
  phone: string;
  geometry: string;
}

const DoctorSettingPage: React.FC = () => {
  const axios = api();
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<IClinicDetailInput>();
  const [modalSuccessOpen, setModalSuccessOpen] = useState<boolean>(false);
  const [modalErrorOpen, setModalErrorOpen] = useState<boolean>(false);
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const [coverImage, setCoverImage] = useState<string>();
  const [specIds, setSpecIds] = useState<any>({});
  const [defaultSpecNames, setDefaultSpecNames] = useState<string[]>([]);
  const { location, coordinates } = useTypedSelector(
    (state) => state.locations
  );
  const queryClient = useQueryClient();

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

  const getClinicDetail = async () => {
    const { data } = await axios.get("/clinics/detail");
    const clinic = data.data.data;

    const specialistIds: string[] = [];
    const defSpecNames: string[] = [];
    clinic?.specialists.forEach((specialist: any) => {
      const { _id, name } = specialist;
      defSpecNames.push(name);
      specialistIds.push(_id);
    });
    setDefaultSpecNames(defSpecNames);

    setCoverImage(clinic?.coverImage?.url);
    setValue("name", clinic?.name);
    setValue("specialists", JSON.stringify(specialistIds));
    setValue("email", clinic?.email);
    setValue("phone", clinic?.phone);
    setValue("description", clinic?.description);
    setValue("address", clinic?.address);
    setValue("geometry", JSON.stringify(clinic?.geometry));

    return clinic;
  };

  const mutationUpdateProfile = useMutation(
    (formData) => {
      return axios.patch(`/clinics/detail`, formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("clinicDetail");
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

  const { data: clinic, isLoading } = useQuery(
    "clinicDetail",
    getClinicDetail,
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  let { data: specialistsData, isLoading: isSpecialistsLoading } = useQuery(
    "specialistData",
    getSpecialists,
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  if (isLoading || isSpecialistsLoading || !defaultSpecNames.length) {
    return (
      <Page className="" title="Dashboard">
        <Backdrop className="backdrop" open>
          <CircularProgress color="secondary" />
        </Backdrop>
      </Page>
    );
  }

  const handleSelectSpecialists = (data: string[]) => {
    const specialistIds: string[] = [];
    data.forEach((name) => {
      specialistIds.push(specIds[name]);
    });
    setValue("specialists", JSON.stringify(specialistIds));
  };

  const handleRemoveCoverImageFile = () => {
    setValue("deleteCoverImage", clinic?.coverImage?.filename);
    setValue("coverImage", undefined);
    setCoverImage("");
  };

  const handleUploadCoverImage = (event: any) => {
    setValue && setValue("coverImage", event.target.files[0]);
    setCoverImage(window.URL.createObjectURL(event.target.files[0]));
  };

  function getFormData(object: any) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  }

  const onSubmitUpdateClinic = async (formData: IClinicDetailInput) => {
    setBackdropOpen(true);
    setModalSuccessOpen(false);
    setModalErrorOpen(false);
    location && (formData.address = location);
    coordinates &&
      (formData.geometry = JSON.stringify({
        type: "Point",
        coordinates: [coordinates.lng, coordinates.lat],
      }));
    const data = getFormData(formData);
    mutationUpdateProfile.mutate(data as any);
  };

  return (
    <Page className="" title="Settings">
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
      <Box mt={5} />
      <form onSubmit={handleSubmit(onSubmitUpdateClinic)}>
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
                  {coverImage ? (
                    <>
                      <img
                        src={coverImage}
                        alt="Clinic cover"
                        className="clinic-cover-image"
                      />

                      <Button
                        className="profile__button"
                        size="medium"
                        color="secondary"
                        fullWidth
                        onClick={handleRemoveCoverImageFile}
                      >
                        Remove Avatar
                      </Button>
                    </>
                  ) : (
                    <>
                      <input
                        style={{ display: "none" }}
                        id="cover-image-file"
                        type="file"
                        onChange={handleUploadCoverImage}
                      />
                      <label
                        htmlFor="cover-image-file"
                        style={{ width: "100%" }}
                      >
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
                  options={specialistsData!}
                  defaultValue={defaultSpecNames}
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
                <SearchLocation address={clinic.address} />
              </Grid>
              <Grid item xs={12}>
                <div className="clinic__map">
                  <Map
                    geometry={[
                      clinic.geometry.coordinates[0],
                      clinic.geometry.coordinates[1],
                    ]}
                    address={clinic.address}
                  />
                </div>
              </Grid>
              <Box ml="auto" mt={2} mr={2}>
                <CustomButton type="submit">Save Changes</CustomButton>
              </Box>
            </Grid>
          </CardContent>
        </Card>
      </form>
      <Box mb={5} />
    </Page>
  );
};

export default DoctorSettingPage;
