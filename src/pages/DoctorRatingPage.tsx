import { Backdrop, Box, CircularProgress } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import api from "../api";
import CommentCard from "../components/comment/CommentCard";
import Page from "../components/Page";
import { IReview } from "../types";
import "./DoctorRatingPage.scss";

const DoctorRatingPage: React.FC = () => {
  const axios = api();

  const getReviews = async () => {
    const { data } = await axios.get("/reviews/clinic");
    const result = data.data.data;
    return result;
  };

  const { isLoading, data: reviews } = useQuery("clinicReviews", getReviews, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  if (isLoading) {
    return (
      <Page className="" title="Dashboard">
        <Backdrop className="backdrop" open>
          <CircularProgress color="secondary" />
        </Backdrop>
      </Page>
    );
  }

  if (!reviews.length) {
    return <div>No data found</div>;
  }

  return (
    <Page className="" title="Rating Dashboard">
      <Box mt={5} />
      <div className="doctor-rating-page-content">
        {reviews.map((review: IReview) => (
          <CommentCard key={review._id} review={review} />
        ))}
      </div>
      <Box mb={5} />
    </Page>
  );
};

export default DoctorRatingPage;
