import React, { useState } from "react";
import {
  Avatar,
  Backdrop,
  Box,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import "./CommentCard.scss";
import { Controller, useForm } from "react-hook-form";
import CustomTextField from "../CustomTextField";
import { useMutation } from "react-query";
import api from "../../api";
import ReplyIcon from "@material-ui/icons/Reply";
import { IReview } from "../../types";

interface ICommentCard {
  review: IReview;
}

const CommentCard: React.FC<ICommentCard> = ({ review }) => {
  const axios = api();
  const { control, setValue, handleSubmit } = useForm();
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const [expanded, setExpanded] = React.useState(false);
  const commentDate = review.updatedAt ?? review.createdAt;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const mutationSubmitComment = useMutation(
    (formData) => {
      return axios.post(`/reviews/reply/${review._id}`, formData);
    },
    {
      onSuccess: (data) => {
        // const review = data.data.data.data;
        setValue("reply", "");
        setBackdropOpen(false);
      },
      onError: (error) => {
        console.error(error);
        setBackdropOpen(false);
      },
    }
  );

  const handleReplySubmit = async (data: any) => {
    const reply = data.reply;
    const formData = { reply };
    mutationSubmitComment.mutate(formData as any);
  };

  return (
    <React.Fragment>
      <Backdrop className="backdrop" open={backdropOpen}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs={1}>
              <Avatar
                classes={{ root: "comment__avatar" }}
                alt="Remy Sharp"
                src={review.user.avatar.url}
              />
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column">
                <h6 className="comment__name">{review.user.name}</h6>
                <p className="comment__date">
                  {new Date(commentDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}{" "}
                  - {new Date(commentDate).getHours()}:
                  {new Date(commentDate).getMinutes()}
                </p>
                <Box mt={1} />
                <p className="comment__content">{review.review}</p>
              </Grid>
            </Grid>
            <Grid item style={{ marginLeft: "auto" }}>
              <Rating
                name="customized-empty"
                defaultValue={review.rating}
                readOnly
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={1}></Grid>
            <CardActions disableSpacing className="comment__replies--collapse">
              <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show replies"
              >
                <ReplyIcon /> <Box ml={1} /> Replies
              </IconButton>
            </CardActions>
          </Grid>
        </CardContent>

        <Collapse
          // className="clinic__map"
          in={expanded}
          timeout="auto"
          unmountOnExit
        >
          <Box ml={15}>
            <CardContent className="comment__replies">
              {review.replies.map((reply) => (
                <Grid container key={reply._id}>
                  <Grid item xs={1}>
                    <Avatar
                      classes={{ root: "comment__avatar" }}
                      alt={reply.user.name}
                      src={reply.user.avatar.url}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Grid container direction="column">
                      <h6 className="comment__name">{reply.user.name}</h6>
                      <Box mt={1} />
                      <p className="comment__content">{reply.reply}</p>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
              <Grid container>
                <Grid item xs={1}>
                  <Avatar
                    classes={{ root: "comment__avatar" }}
                    alt="Remy"
                    src="../assets/images/default-avatar.jpg"
                  />
                </Grid>
                <Grid item xs={9}>
                  <form onSubmit={handleSubmit(handleReplySubmit)}>
                    <Controller
                      name="reply"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CustomTextField
                          placeholder="Type here to reply..."
                          {...field}
                        />
                      )}
                    />
                  </form>
                </Grid>
              </Grid>
            </CardContent>
          </Box>
        </Collapse>
      </Card>
    </React.Fragment>
  );
};

export default CommentCard;
