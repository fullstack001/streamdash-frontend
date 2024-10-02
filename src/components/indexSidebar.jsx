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
        sx={{
          p: { md: 4, sx: 2 },
          textAlign: 'left',
          color: '#156BE2',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Why StreamDash?
        </Typography>

        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{
            color: '#156BE2',
          }}
        >
          {[
            { icon: '1.svg', text: 'Global TV Access' },
            { icon: '2.svg', text: 'Stream on Any Device' },
            { icon: '3.svg', text: 'Unlimited Device Connections' },
            { icon: '4.svg', text: 'Automatic Access & Self-Managed Dashboard' },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'flex-start', sm: 'center', md: 'flex-start' },
                  flexDirection: { xs: 'row', sm: 'column', md: 'column' },
                  textAlign: { xs: 'left', sm: 'center', md: 'center' },
                  '& img': {
                    width: '100px',
                    marginRight: '0px',
                    '@media (max-width: 900px)': {
                      width: '60px',
                      marginRight: '8px',
                    },
                  },
                }}
              >
                <img src={`/assets/icons/landing/${item.icon}`} alt={`feature-${index + 1}`} />
                <Typography>{item.text}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
