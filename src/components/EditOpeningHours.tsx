import {
  makeStyles,
  Theme,
  createStyles,
  Button,
  Box,
} from "@material-ui/core";
import React from "react";
import CustomTableOpeningHours from "./CustomTableOpeningHours";
import "./EditOpeningHours.scss";
import OpeningHoursDialog from "./OpeningHoursDialog";
import { days } from "../components/register-clinic-form/controls.model";

interface IEditOpeningHours {
  handleDialogClose: (value: (number | null)[][]) => void;
  workingHours: (number | null)[][];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "80%",
      maxHeight: 435,
    },
  })
);

const EditOpeningHours: React.FC<IEditOpeningHours> = ({
  handleDialogClose,
  workingHours,
}) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openingHours, setOpeningHours] =
    React.useState<(number | null)[][]>(workingHours);

  const handleClickAddHours = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (newValue?: (number | null)[][]) => {
    setOpenDialog(false);

    if (newValue) {
      const edittedOpeningHours = [...openingHours];
      days.forEach((_, index) => {
        if (newValue[index].length !== 0) {
          edittedOpeningHours[index] = newValue[index];
        }
      });
      setOpeningHours(edittedOpeningHours);

      handleDialogClose(newValue);
    }
  };

  return (
    <>
      <Button
        color="secondary"
        variant="outlined"
        onClick={handleClickAddHours}
        fullWidth
      >
        Edit Hours
      </Button>
      <Box mb={1} />
      <OpeningHoursDialog
        classes={{
          paper: classes.paper,
        }}
        id="ringtone-menu"
        keepMounted
        open={openDialog}
        onClose={handleCloseDialog}
        value={openingHours}
      />
      <CustomTableOpeningHours workingHours={openingHours} />
    </>
  );
};

export default EditOpeningHours;
