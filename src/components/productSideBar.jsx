import React from 'react';

import { Box, Grid, Typography } from '@mui/material';

export default function ProductSideBar() {
  return (
    <Box sx={{ backgroundColor: '#F8F4F5', borderRadius: 6, pb: 3 }}>
      {/* Header Section */}
      <Grid container sx={{ padding: '0px' }}>
        <Grid item xs={12} md={6} sx={{ padding: '40px' }}>
          <Typography
            sx={{ fontSize: { xs: '30px', md: '45px' }, fontWeight: '600' }}
            gutterBottom
            color="#156BE2"
          >
            Best IPTV Service
          </Typography>
          <Typography
            sx={{ fontSize: { xs: '18px', md: '20px' }, fontWeight: '300', marginBottom: '10px' }}
            color="textSecondary"
          >
            Choose the plan that fits your needs and enjoy seamless streaming of a wide variety of
            channels and thousands of VODs.
          </Typography>
          <Box sx={{ display: 'flex', marginTop: '10px' }}>
            <img
              width="25px"
              height="25px"
              style={{ marginTop: '5px' }}
              src="/assets/icons/round_check.svg"
              alt="Smart TV"
            />
            <Typography
              sx={{ fontSize: { xs: '18px', md: '20px' }, fontWeight: '500', marginLeft: '10px' }}
            >
              Access over 9,000 live channels
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', marginTop: '10px' }}>
            <img
              width="25px"
              height="25px"
              style={{ marginTop: '5px' }}
              src="/assets/icons/round_check.svg"
              alt="Smart TV"
            />
            <Typography
              sx={{ fontSize: { xs: '18px', md: '20px' }, fontWeight: '500', marginLeft: '10px' }}
            >
              Money-back guarantee for peace of mind
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', marginTop: '10px' }}>
            <img
              width="25px"
              height="25px"
              style={{ marginTop: '5px' }}
              src="/assets/icons/round_check.svg"
              alt="Smart TV"
            />
            <Typography
              sx={{ fontSize: { xs: '18px', md: '20px' }, fontWeight: '500', marginLeft: '10px' }}
            >
              Simple set-up. Perfect privacy
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', marginTop: '10px' }}>
            <img
              width="25px"
              height="25px"
              style={{ marginTop: '5px' }}
              src="/assets/icons/round_check.svg"
              alt="Smart TV"
            />
            <Typography
              sx={{ fontSize: { xs: '18px', md: '20px' }, fontWeight: '500', marginLeft: '10px' }}
            >
              Money-back guarantee for peace of mind
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            textAlign: 'right',
            position: 'relative',
            display: { xs: 'none', md: 'block' }, // Hide on xs, show on md and above
          }}
        >
          <div style={{ position: 'relative', width: '90%', marginLeft: 'auto' }}>
            {/* The gradient overlay container */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'linear-gradient(to right, #F8F4F5 10%, transparent 30%), linear-gradient(to top, #F8F4F5 10%, transparent 30%)',
              }}
            />
            {/* The actual image */}
            <img
              src="/assets/images/product.png"
              style={{
                width: '100%',
                borderRadius: '40px',
              }}
              alt="Product"
            />
          </div>
        </Grid>
      </Grid>
      <Grid
        item
        justifyContent="center"
        sx={{
          position: 'relative',
          padding: 0,
          textAlign: 'center',
          '& img': {
            margin: '0 5%',
            opacity: 0.4,
            width: '80px',
            height: '100px',
            '@media (max-width: 900px)': {
              width: '40px',
              height: '50px',
            },
          },
        }}
      >
        <img src="/assets/images/products/smart-tv-icon.png" alt="Smart TV" />
        <img src="/assets/images/products/laptop-icon.png" alt="Laptop or PC" />
        <img src="/assets/images/products/android-icon.png" alt="Android" />
        <img src="/assets/images/products/ios-icon.png" alt="iOS" />
        <img src="/assets/images/products/windows-icon.png" alt="Windows" />
      </Grid>
    </Box>
  );
}
