import { Card, CardContent, Grid, Typography } from "@material-ui/core";

interface IStatisticCard {
  title: string;
  statistic: string;
}

const StatisticCard: React.FC<IStatisticCard> = ({ title, statistic }) => {
  return (
    <Card>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {statistic}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StatisticCard;
