import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { Box, useTheme, Typography, useMediaQuery } from '@mui/material';

import { getPromotion } from 'src/lib/api/promotion';

export default function CongratulationCard({ user }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  useEffect(() => {
    const getNoti = async () => {
      try {
        const res = await getPromotion();
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
        flexDirection: isSmallScreen ? 'column' : 'row', // Switch layout direction on small screens
        alignItems: 'center',
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
          {title} <span style={{ color: '#6200ea', marginLeft: '8px' }}>{user}!</span> 🎉
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
          {content}{' '}
        </Typography>
      </Box>
    </Box>
  );
}

CongratulationCard.propTypes = {
  user: PropTypes.string,
};
