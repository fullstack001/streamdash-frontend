import React from 'react';

import { Box, Container, Typography } from '@mui/material';

export default function ProductSideBar() {
  return (
    <Container
      p={4}
      sx={{
        textAlign: 'left',
        alignItems: 'center',
        marginLeft: '10%',
      }}
      spacing={4}
    >
      {/* Header Section */}
      <Box>
        <Typography sx={{ fontSize: '45px', fontWeight: '600' }} gutterBottom color="#156BE2">
          Unbeatable IPTV Prices - We Dare You to Find Cheaper!
        </Typography>
        <Typography
          sx={{ fontSize: '25px', fontWeight: '300', marginBottom: '10px' }}
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
          <Typography sx={{ fontSize: '25px', fontWeight: '500', marginLeft: '10px' }}>
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
          <Typography sx={{ fontSize: '25px', fontWeight: '500', marginLeft: '10px' }}>
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
          <Typography sx={{ fontSize: '25px', fontWeight: '500', marginLeft: '10px' }}>
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
          <Typography sx={{ fontSize: '25px', fontWeight: '500', marginLeft: '10px' }}>
            Money-back guarantee for peace of mind
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', marginTop: '40px' }}>
          <img
            width="50px"
            height="60px"
            src="/assets/images/products/smart-tv-icon.png"
            alt="Smart TV"
          />
          <img
            width="50px"
            height="60px"
            src="/assets/images/products/laptop-icon.png"
            alt="Laptop or PC"
          />
          <img
            width="50px"
            height="60px"
            src="/assets/images/products/android-icon.png"
            alt="Android"
          />
          <img width="50px" height="60px" src="/assets/images/products/ios-icon.png" alt="iOS" />
          <img
            width="50px"
            height="60px"
            src="/assets/images/products/windows-icon.png"
            alt="Windows"
          />
        </Box>
      </Box>
    </Container>
  );
}
