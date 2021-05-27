import { Box } from "@material-ui/core";
import React from "react";
import CommentCard from "../components/comment/CommentCard";
import Page from "../components/Page";
import "./DoctorRatingPage.scss";

const DoctorRatingPage: React.FC = () => {
  return (
    <Page className="" title="Rating dashboard">
      <Box mt={5} />
      <div className="doctor-rating-page-content">
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
      </div>
      <Box mb={5} />
    </Page>
  );
};

export default DoctorRatingPage;
