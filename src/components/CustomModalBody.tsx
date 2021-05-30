import { Button, Card, Grid } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { Dispatch, SetStateAction } from "react";
import "./CustomModalBody.scss";

interface ICustomModalBody {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const CustomModalBody: React.FC<ICustomModalBody> = ({ setModalOpen }) => {
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
          <CheckCircleOutlineIcon
            style={{ fontSize: "5rem", color: "green" }}
          />
        </Grid>
        <Grid item style={{ fontSize: "1.7rem" }}>
          Successfully save changes
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            style={{ fontSize: "1.7rem", color: "green" }}
            onClick={() => setModalOpen(false)}
          >
            OK
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CustomModalBody;
