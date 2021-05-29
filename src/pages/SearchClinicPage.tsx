import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import { useQuery } from "react-query";
import api from "../api/";
import "./SearchClinicPage.scss";

import CardClinicDetail from "../components/card-clinic-detail/CardClinicDetail";

const SearchClinicPage = () => {
  const axios = api();
  const { isLoading, isError, error, data } = useQuery(
    "clinicData",
    async () => {
      const response = await axios.get("/clinics/approved-clinics");
      return response.data;
    }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

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
              placeholder="Search for the clinic"
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
        {data.data.data.map((clinic: any) => (
          <CardClinicDetail key={clinic._id} clinic={clinic} />
        ))}
      </section>
    </>
  );
};

export default SearchClinicPage;
