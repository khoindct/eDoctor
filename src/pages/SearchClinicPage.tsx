import React from "react";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";

import "./SearchClinicPage.scss";

import CardClinicDetail from "../components/card-clinic-detail/CardClinicDetail";

const SearchClinicPage = () => {
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
        <CardClinicDetail />
      </section>
    </>
  );
};

export default SearchClinicPage;
