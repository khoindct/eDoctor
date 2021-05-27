import React from "react";
import { Avatar, Box, Card, CardContent, Grid } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import "./CommentCard.scss";

const CommentCard: React.FC = () => {
  return (
    <React.Fragment>
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
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default CommentCard;
