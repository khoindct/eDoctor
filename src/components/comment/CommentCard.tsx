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

interface ICommentCard {
  review?: any;
}

const CommentCard: React.FC<ICommentCard> = ({ review }) => {
  const axios = api();
  const { control, setValue, handleSubmit } = useForm();
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const mutationSubmitComment = useMutation(
    (formData) => {
      return axios.post(`/reviews/${review._id}`, formData);
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
    const rating = +data.rating;
    const review = data.review;
    const formData = { rating, review };
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
                src="../assets/images/default-avatar.jpg"
              />
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column">
                <h6 className="comment__name">Jane Rotanson</h6>
                <p className="comment__date">27/05/2021 - 07:00</p>
                <Box mt={1} />
                <p className="comment__content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quibusdam labore sequi corrupti temporibus, officiis voluptas
                  culpa deleniti animi quis, tempore facilis dolore autem
                  repellendus similique quae totam obcaecati debitis. Neque?
                </p>
              </Grid>
            </Grid>
            <Grid item style={{ marginLeft: "auto" }}>
              <Rating
                name="customized-empty"
                defaultValue={5}
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
              <Grid container>
                <Grid item xs={1}>
                  <Avatar
                    classes={{ root: "comment__avatar" }}
                    alt="Remy Sharp"
                    src="../assets/images/default-avatar.jpg"
                  />
                </Grid>
                <Grid item xs={9}>
                  <Grid container direction="column">
                    <h6 className="comment__name">Jane Rotanson</h6>
                    <Box mt={1} />
                    <p className="comment__content">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quibusdam labore sequi corrupti temporibus, officiis
                      voluptas culpa deleniti animi quis, tempore facilis dolore
                      autem repellendus similique quae totam obcaecati debitis.
                      Neque?
                    </p>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={1}>
                  <Avatar
                    classes={{ root: "comment__avatar" }}
                    alt="Remy Sharp"
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
