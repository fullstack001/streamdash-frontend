import React from 'react';
import PropTypes from 'prop-types';

import { Box, Modal, Button, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TrialActivatedPopup({ onClose }) {
  return (
    <Modal
      open
      onClose={onClose}
      aria-labelledby="trial-activated-popup"
      aria-describedby="trial-activated-description"
    >
      <Box sx={style}>
        <Typography id="trial-activated-popup" variant="h6" component="h2">
          Your trial is now activated!
        </Typography>
        <Typography id="trial-activated-description" sx={{ mt: 2 }}>
          Free trial will be active for 2 days once you connect your device. To get started, simply
          add your device.
        </Typography>
        <Button onClick={onClose} sx={{ mt: 2 }}>
          Got it
        </Button>
      </Box>
    </Modal>
  );
}

TrialActivatedPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};
