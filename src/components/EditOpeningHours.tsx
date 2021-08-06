import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import React from "react";
import CustomTableOpeningHours from "./CustomTableOpeningHours";
import "./EditOpeningHours.scss";
import OpeningHoursDialog from "./OpeningHoursDialog";

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

  React.useEffect(() => {
    console.log(openingHours);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickAddHours = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (newValue?: (number | null)[][]) => {
    setOpenDialog(false);

    if (newValue) {
      setOpeningHours(newValue);
      handleDialogClose(newValue);
    }
  };

  return (
    <>
      <Button
        color="secondary"
        variant="outlined"
        onClick={handleClickAddHours}
      >
        Edit Hours
      </Button>
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
