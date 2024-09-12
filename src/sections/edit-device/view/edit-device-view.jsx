import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
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
  FormHelperText,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useAuth } from 'src/hooks/use-auth';

import devicesStore from 'src/store/devicesStore';
import uploadDeviceData from 'src/lib/api/uploadDeviceData';
import addCreditToDevice from 'src/lib/api/addCreditToDevice';

import Label from 'src/components/label';

export default function EditDeviceView() {
  const user = useAuth();
  const { devices, userDevices, setDevices, updateDevice, updateUserDevice } = devicesStore();
  // const { devices, userDevices } = devicesStore();
  const router = useRouter();
  const { id } = useParams();
  const [credits, setCredits] = useState(null);
  const [originMac, setOriginMac] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mac, setMac] = useState('');
  const [expiry, setExpiry] = useState(null);
  const [status, setStatus] = useState(null);
  const [creatDate, setCreatDate] = useState(null);
  const [editloading, setEditLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [creditsError, setCreditsError] = useState('');
  const [errors, setErrors] = useState({
    password: '',
    mac: '',
  });

  useEffect(() => {
    const originDevice = devices.find((device) => device.loginId === id);
    const userDevice = userDevices.find((device) => device.username === id);
    setCreatDate(userDevice.date);
    setName(originDevice.name);
    setPassword(userDevice.password);
    setOriginMac(userDevice.mac);
    setMac(userDevice.mac);
    setExpiry(originDevice.expiry);
    setStatus(originDevice.status);
  }, [id, devices, userDevices]);

  const goBack = () => {
    router.push('/all-devices');
  };

  const handleCreditsChange = (event) => {
    const selectedCredits = event.target.value;
    if (selectedCredits > user.credit) {
      // Compare selected value with user.credit
      setCreditsError(
        `Selected credits (${selectedCredits}) exceed your available credits (${user.credit}).`
      );
      setCredits(null);
    } else {
      setCreditsError('');
      setCredits(selectedCredits);
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { password: '', mac: '' };
    if (password.trim() === '') {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      isValid = false;
    }
    if (mac.trim() === '') {
      newErrors.mac = 'MAC ID is required';
      isValid = false;
    } else if (!/^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/i.test(mac)) {
      newErrors.mac = 'MAC ID is invalid';
      isValid = false;
    } else if (originMac !== mac && devices.find((item) => item.mac === mac)) {
      newErrors.mac = 'MAC ID already exists.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleEditUser = async () => {
    if (validate()) {
      setEditLoading(true);
      try {
        const data = { id, name, password, mac };
        const response = await uploadDeviceData(data);
        if (response === 500) {
          setSnackbarSeverity('error');
          setSnackbarMessage('Failed to update device data.');
        } else {
          updateDevice(id, { name, mac, expiry, status });
          updateUserDevice(id, { name, password, mac });
          setSnackbarSeverity('success');
          setSnackbarMessage('Your device data has been updateded successfully. ');
        }
      } catch (error) {
        setSnackbarSeverity('error');
        setSnackbarMessage('Failed to update device data.');
      } finally {
        setEditLoading(false);
        setSnackbarOpen(true);
      }
    }
  };

  const handleAddCredit = async () => {
    if (credits > 0) {
      const mail = user.email;
      const data = { email: mail, id, credits };
      setAddLoading(true);
      try {
        const res = await addCreditToDevice(data);
        if (res === 500) {
          setSnackbarSeverity('error');
          setSnackbarMessage('Failed to Add Credit to Device.');
        } else {
          setDevices(res.data);
          setSnackbarSeverity('success');
          setSnackbarMessage(
            `${credits} credit${credits > 1 ? 's' : ''} has been added to you device successfully. `
          );
        }
      } catch (error) {
        setSnackbarSeverity('error');
        setSnackbarMessage('Failed to update device data.');
      } finally {
        setAddLoading(false);
        setSnackbarOpen(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

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
          <TextField
            disabled={status === 'INACTIVE'}
            fullWidth
            label="Name"
            value={name}
            margin="normal"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField fullWidth label="Username" value={id} margin="normal" disabled />
          <TextField
            fullWidth
            disabled={status === 'INACTIVE'}
            label="Password"
            type="password"
            value={password}
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password}
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="MAC"
            value={mac}
            variant="outlined"
            error={!!errors.mac}
            helperText={errors.mac}
            margin="normal"
            onChange={(e) => setMac(e.target.value)}
          />
          <Box mt={2}>
            <Button
              variant="contained"
              color="success"
              onClick={handleEditUser}
              disabled={status === 'INACTIVE'}
            >
              {editloading ? (
                <img
                  src="/assets/icons/spinner.svg"
                  alt="Loading"
                  style={{ width: 24, height: 24 }}
                />
              ) : (
                'Submit'
              )}
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
              <Grid item md={12}>
                <Typography>
                  Expiry:<span style={{ color: 'orange', 'margin-left': '10px' }}>{expiry}</span>
                </Typography>
              </Grid>
              <Grid item md={12}>
                <Typography>
                  Create At:
                  <span style={{ color: 'orange', 'margin-left': '10px' }}>
                    {creatDate ? creatDate.split('T')[0] : ''}
                  </span>
                </Typography>
              </Grid>
              <Grid item md={12}>
                <Typography>
                  Active:
                  <Label color={(status === 'INACTIVE' && 'error') || 'success'} ml={2}>
                    {status}
                  </Label>
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="h6">Credits</Typography>
            <FormControl fullWidth margin="normal" error={Boolean(creditsError)}>
              <InputLabel>Select Credits</InputLabel>
              <Select
                value={credits}
                onChange={handleCreditsChange}
                sx={{
                  color: creditsError ? 'red' : 'inherit',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: creditsError ? 'red' : 'inherit',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: creditsError ? 'red' : 'primary.main',
                  },
                }}
              >
                {Array.from({ length: 24 }, (_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
              {creditsError && (
                <FormHelperText sx={{ color: 'red' }}>{creditsError}</FormHelperText>
              )}
            </FormControl>
            <Box mt={2}>
              <Button variant="contained" color="success" onClick={handleAddCredit}>
                {addLoading ? (
                  <img
                    src="/assets/icons/spinner.svg"
                    alt="Loading"
                    style={{ width: 24, height: 24 }}
                  />
                ) : (
                  'Submit'
                )}
              </Button>
              <Button variant="contained" color="error" sx={{ ml: 2 }} onClick={goBack}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
