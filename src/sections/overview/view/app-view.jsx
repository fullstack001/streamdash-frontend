import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppWidgetSummary from '../app-widget-summary';

const credits = [1, 6, 12, 50, 100, 200, 500];

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        {credits.map((credit) => (
          <Grid item xs={12} sm={6} md={3} key={credit}>
            <AppWidgetSummary
              title="Credits"
              total={credit}
              color="success"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
