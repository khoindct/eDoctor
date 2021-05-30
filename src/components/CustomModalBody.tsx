import { Button, Card, Grid } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Dispatch, SetStateAction } from "react";
import "./CustomModalBody.scss";

interface ICustomModalBody {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  type: "success" | "error";
  message: string;
}

const CustomModalBody: React.FC<ICustomModalBody> = ({
  setModalOpen,
  type,
  message,
}) => {
  return (
    <Card>
      <Grid
        container
        justify="space-around"
        alignItems="center"
        direction="column"
        style={{ padding: "5rem", gap: "2rem" }}
      >
        <Grid item>
          {type === "success" && (
            <CheckCircleOutlineIcon
              style={{ fontSize: "5rem", color: "green" }}
            />
          )}
          {type === "error" && (
            <HighlightOffIcon style={{ fontSize: "5rem", color: "red" }} />
          )}
        </Grid>
        <Grid item style={{ fontSize: "1.7rem" }}>
          {message}
        </Grid>
        <Grid item>
          {type === "success" && (
            <Button
              variant="outlined"
              style={{ fontSize: "1.7rem", color: "green" }}
              onClick={() => setModalOpen(false)}
            >
              OK
            </Button>
          )}
          {type === "error" && (
            <Button
              variant="outlined"
              style={{ fontSize: "1.7rem", color: "red" }}
              onClick={() => setModalOpen(false)}
            >
              Try Again
            </Button>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default CustomModalBody;
