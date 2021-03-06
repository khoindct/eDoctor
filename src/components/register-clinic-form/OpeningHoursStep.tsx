import React, { useEffect } from "react";
import { Box, Button, createStyles, Grid, Theme } from "@material-ui/core";
import CustomButton from "../CustomButton";
import { IFormStep, IDays } from "./controls.model";
import OpeningHoursDialog from "../OpeningHoursDialog";
import { makeStyles } from "@material-ui/styles";
import CustomTableOpeningHours from "../CustomTableOpeningHours";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "80%",
      maxHeight: 435,
    },
  })
);

const OpeningHoursStep: React.FC<IFormStep> = ({
  handleNext,
  handleBack,
  getValues,
  setValue,
}) => {
  const isValid = true;
  const classes = useStyles();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openingHours, setOpeningHours] = React.useState<(number | null)[][]>(
    Array(7).fill([])
  );
  const days: IDays[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  useEffect(() => {
    const values = Array(7).fill([]);
    values[0] = getValues!("sunday");
    values[1] = getValues!("monday");
    values[2] = getValues!("tuesday");
    values[3] = getValues!("wednesday");
    values[4] = getValues!("thursday");
    values[5] = getValues!("friday");
    values[6] = getValues!("saturday");
    setOpeningHours(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickAddHours = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (newValue?: (number | null)[][]) => {
    setOpenDialog(false);

    if (newValue) {
      const edittedOpeningHours = [...openingHours];
      days.forEach((day, index) => {
        if (newValue[index].length !== 0) {
          edittedOpeningHours[index] = newValue[index];
          setValue!(day, newValue[index]);
        }
      });
      setOpeningHours(edittedOpeningHours);
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
      <Box ml="auto" mt={2} mr={2}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <CustomButton callback={handleBack}>Back</CustomButton>
          </Grid>
          <Grid item xs={6}>
            <CustomButton
              isDisabled={!isValid}
              callback={isValid ? handleNext : undefined}
            >
              Next
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default OpeningHoursStep;
