import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import { useQuery } from "react-query";
import api from "../api/";
import "./SearchClinicPage.scss";

import CardClinicDetail from "../components/card-clinic-detail/CardClinicDetail";
import { ChangeEvent, useState } from "react";
import { CircularProgress } from "@material-ui/core";

const SearchClinicPage = () => {
  const axios = api();
  const [clinics, setClinics] = useState<any[]>([]);
  const [filterInput, setFilterInput] = useState<string>("");

  const getClinics = async () => {
    const response = await axios.get("/clinics/approved-clinics");
    const data = response.data.data.data;
    setClinics(data);
    return data;
  };

  const { isLoading, isError, error } = useQuery("clinicData", getClinics, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  const filterClinics = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFilterInput(e.target.value);
  };

  if (isError) {
    return <span>Error: {(error as any).message}</span>;
  }

  return (
    <>
      <section className="search-section">
        <div className="search-bar">
          <FormControl fullWidth>
            <Input
              id="input-with-icon-adornment"
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
        </div>
      </section>

      <section className="clinic-section">
        {isLoading && <CircularProgress color="secondary" />}
        {!clinics.length && "No clinics found"}
        {clinics.length &&
          clinics
            .filter((clinic) => clinic.name.toLowerCase().includes(filterInput))
            .map((clinic: any) => (
              <CardClinicDetail key={clinic._id} clinic={clinic} />
            ))}
      </section>
    </>
  );
};

export default SearchClinicPage;
