import { useEffect } from "react";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import DescriptionIcon from "@material-ui/icons/Description";
import { useQuery } from "react-query";
import api from "../api/";
import "./SearchClinicPage.scss";

import CardClinicDetail from "../components/card-clinic-detail/CardClinicDetail";
import { ChangeEvent, useState } from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import CustomAutoComplete from "../components/CustomAutoComplete";

const SearchClinicPage = () => {
  const axios = api();
  const [clinics, setClinics] = useState<any[]>([]);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [searchSymptoms, setSearchSymptoms] = useState<string>();
  const [searchUserDescription, setSearchUserDescription] = useState<string>();
  const [filterInput, setFilterInput] = useState<string>("");

  useEffect(() => {
    const a = setTimeout(async () => {
      const data = await axios.get("clinics/symptom", {
        params: { symptoms: searchSymptoms },
      });
      const result = data.data.data.data;
      setClinics(result);
    }, 300);
    return () => {
      clearTimeout(a);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchSymptoms]);

  useEffect(() => {
    const a = setTimeout(async () => {
      const data = await axios.get("clinics/user-description", {
        params: { diagnosis: searchUserDescription },
      });
      const result = data.data.data.data;
      setClinics(result);
    }, 300);
    return () => {
      clearTimeout(a);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchUserDescription]);

  const getClinics = async () => {
    const response = await axios.get("/clinics/approved-clinics");
    const data = response.data.data.data;
    setClinics(data);

    const symptomResponse = await axios.get("/specialists/symptoms");
    const symptomData = symptomResponse.data.data.data;
    setSymptoms(symptomData);
    return data;
  };

  let { isLoading, isError, error } = useQuery("clinicData", getClinics, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  const filterClinics = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFilterInput(e.target.value);
  };

  const filterDescriptionClinics = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchUserDescription(e.target.value);
  };

  const handleSearchClinicsBySymptoms = (searchSymptoms: string[]) => {
    const data = searchSymptoms.join(",");
    setSearchSymptoms(data);
  };

  if (isError) {
    return <span>Error: {(error as any).message}</span>;
  }

  return (
    <>
      <section className="search-section">
        <Grid
          container
          alignItems="flex-end"
          justify="space-between"
          className="search-bar"
        >
          <Grid item md={3}>
            <CustomAutoComplete
              options={symptoms}
              handleChange={handleSearchClinicsBySymptoms}
              label="Tri???u ch???ng"
              placeholder="Nh???p tri???u ch???ng b???nh"
            />
          </Grid>
          <Grid item md={4}>
            <FormControl fullWidth>
              <Input
                placeholder="Describe your situation"
                onChange={(e) => filterDescriptionClinics(e)}
                classes={{ input: "search-input" }}
                startAdornment={
                  <InputAdornment position="start">
                    <DescriptionIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item md={4}>
            <FormControl fullWidth>
              <Input
                placeholder="Search for the clinic by name"
                onChange={(e) => filterClinics(e)}
                classes={{ input: "search-input" }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </section>
      <section className="clinic-section">
        {isLoading && <CircularProgress color="secondary" />}
        {!clinics.length && (
          <img
            src="assets/images/empty_data.svg"
            alt="Empty data"
            style={{ width: "50%" }}
          />
        )}
        {!!clinics.length &&
          (clinics
            .filter((clinic) => clinic.name.toLowerCase().includes(filterInput))
            .map((clinic: any) => (
              <CardClinicDetail key={clinic._id} clinic={clinic} />
            )).length ? (
            clinics
              .filter((clinic) =>
                clinic.name.toLowerCase().includes(filterInput)
              )
              .map((clinic: any) => (
                <CardClinicDetail key={clinic._id} clinic={clinic} />
              ))
          ) : (
            <img
              src="assets/images/empty_patient.svg"
              alt="Empty data"
              style={{ width: "50%" }}
            />
          ))}
      </section>
    </>
  );
};

export default SearchClinicPage;
