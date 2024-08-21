import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Box,
  Grid,
  Paper,
  Button,
  Select,
  MenuItem,
  TextField,
  IconButton,
  InputLabel,
  Typography,
  FormControl,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

export default function EditDeviceView() {
  const router = useRouter();
  const { id } = useParams();
  const [credits, setCredits] = useState(1);

  const goBack = () => {
    router.push('/all-devices');
  };

  const handleCreditsChange = (event) => {
    setCredits(event.target.value);
  };

  console.log('Editing device with ID:', id);

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="flex-end">
        <IconButton color="error" onClick={goBack}>
          Back
        </IconButton>
      </Box>

      <Grid container spacing={2} component={Paper} p={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Edit users</Typography>
          <TextField fullWidth label="Name" defaultValue="da1991331" margin="normal" />
          <TextField fullWidth label="Username" defaultValue="da910401" margin="normal" disabled />
          <TextField fullWidth label="Password" defaultValue="da19391" margin="normal" />
          <TextField fullWidth label="MAC" defaultValue="00:1A:78:49:30:FE" margin="normal" />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select defaultValue="ACTIVE">
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            </Select>
          </FormControl>
          <Box mt={2}>
            <Button variant="contained" color="success">
              Submit
            </Button>
            <Button variant="contained" color="error" sx={{ ml: 2 }} onClick={goBack}>
              Cancel
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box mt={2}>
            <Typography variant="h6">STB Info</Typography>
            <Grid container spacing={2} my={4}>
              <Grid item xs={6}>
                <Typography>
                  Expiry: <span style={{ color: 'orange' }}>2024-08-21</span>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Created: 2024-08-19 14:32:33</Typography>
              </Grid>
            </Grid>
            <Typography variant="h6">Credits</Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Credits</InputLabel>
              <Select value={credits} onChange={handleCreditsChange}>
                {Array.from({ length: 24 }, (_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box mt={2}>
              <Button variant="contained" color="success">
                Submit
              </Button>
              <Button variant="contained" color="error" sx={{ ml: 2 }} onClick={goBack}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
