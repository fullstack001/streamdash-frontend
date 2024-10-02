import React, { useState, useEffect } from 'react';

import { Box, Stack, useTheme, Typography, useMediaQuery } from '@mui/material';

import { getNotification } from 'src/lib/api/notification';

export default function CongratulationCard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  useEffect(() => {
    const getNoti = async () => {
      try {
        const res = await getNotification();
        setTitle(res.title);
        setContent(res.content);
      } catch (error) {
        console.log(error);
      }
    };
    getNoti();
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row', // Switch layout direction on small screens
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isSmallScreen ? 2 : 3,
        borderRadius: 3,
        boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        maxWidth: 1000,
        margin: '20px auto',
      }}
    >
      {/* Left side: Text and button */}
      <Box sx={{ margin: isSmallScreen ? '10px 0' : '20px' }}>
        <Typography
          variant={isSmallScreen ? 'h5' : 'h3'} // Adjust font size for smaller screens
          sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
        >
          {title} 🎉
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
          {content}{' '}
        </Typography>
      </Box>

      {/* Right side: Avatar and badge image */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent={isSmallScreen ? 'center' : 'flex-end'}
        sx={{ width: isSmallScreen ? '100%' : 'auto' }}
      >
        {/* Badge and additional images */}
        <Stack direction="column" spacing={1} alignItems="center">
          <img
            src="/assets/images/tv_6113713.png"
            alt="Badge"
            style={{
              width: isSmallScreen ? '30%' : '40%', // Adjust image size on smaller screens
              height: 'auto',
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
