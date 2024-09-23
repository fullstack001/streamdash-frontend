import React from 'react';

import { Box, Grid, Container, Typography } from '@mui/material';

export default function IndexSideBar() {
  return (
    <Container
      p={4}
      sx={{
        textAlign: 'left',
        alignItems: 'center',
      }}
      spacing={4}
    >
      {/* Header Section */}
      <Box>
        <Typography variant="h4" gutterBottom color="#156BE2">
          Explore a New World of TV
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Welcome to StreamDash – the best IPTV management platform. Get access to global TV
          channels and on demand content with ease. Easily manage your devices with our self managed
          dashboard.
        </Typography>
      </Box>

      {/* Features Section */}
      <Box
        mt={4}
        elevation={3}
        p={4}
        sx={{
          textAlign: 'left',
          color: '#156BE2',
          '@media (min-width: 900px)': {
            textAlign: 'left',
          },
        }}
      >
        <Typography variant="h5" gutterBottom>
          Why StreamDash?
        </Typography>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{
            textAlign: 'center',
            color: '#156BE2',
            '@media (min-width: 900px)': {
              textAlign: 'left',
            },
          }}
        >
          {/* Global TV Access */}
          <Grid item xs={12} md={3}>
            <img src="/assets/icons/landing/1.svg" alt="first" />
            <Typography>Global TV Access</Typography>
          </Grid>

          {/* Stream on Any Device */}
          <Grid item xs={12} md={3}>
            <img src="/assets/icons/landing/2.svg" alt="first" />

            <Typography>Stream on Any Device</Typography>
          </Grid>

          {/* Unlimited Device Connections */}
          <Grid item xs={12} md={3}>
            <img src="/assets/icons/landing/3.svg" alt="first" />

            <Typography>Unlimited Device Connections</Typography>
          </Grid>

          {/* Automatic Access & Self-Managed Dashboard */}
          <Grid item xs={12} md={3}>
            <img src="/assets/icons/landing/4.svg" alt="first" />

            <Typography>Automatic Access & Self-Managed Dashboard</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
