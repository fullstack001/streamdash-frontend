import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function ProductsView() {
  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement form submission logic here
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Add Device
      </Typography>

      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField fullWidth label="Username" variant="outlined" required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Password" type="password" variant="outlined" required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="MAC ID" variant="outlined" required />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
