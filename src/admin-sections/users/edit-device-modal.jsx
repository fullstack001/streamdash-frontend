import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Grid,
  Dialog,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  Typography,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
  FormHelperText,
} from '@mui/material';

import uploadDeviceData from 'src/lib/api/uploadDeviceData';
import addCreditToDevice from 'src/lib/api/addCreditToDevice';

import Label from 'src/components/label';

export default function EditDeviceModal({
  open,
  onClose,
  credit,
  devices,
  userDevices,
  email,
  device,
  refetchCredit,
}) {
  const deviceId = device ? device.loginId : '';
  const [credits, setCredits] = useState(1);
  const [originMac, setOriginMac] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mac, setMac] = useState('');
  const [expiry, setExpiry] = useState(null);
  const [status, setStatus] = useState(null);
  const [editloading, setEditLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [creditsError, setCreditsError] = useState('');
  const [errors, setErrors] = useState({
    password: '',
    mac: '',
  });

  function calculateExpiryDate(addedCredit, oldExpiry) {
    const now = new Date(oldExpiry);
    const expiryDate = new Date(
      now.getFullYear(),
      now.getMonth() + Number(addedCredit),
      now.getDate()
    ); // 'credit' months from now

    return expiryDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }

  useEffect(() => {
    if (device) {
      // ... set state with device data
      setName(device.name);
      setOriginMac(device.mac);
      setMac(device.mac);
      setExpiry(device.expiry);
      setStatus(device.status);
    }
  }, [device]);

  const handleCreditsChange = (event) => {
    const selectedCredits = event.target.value;
    if (selectedCredits > credit) {
      // Compare selected value with user.credit
      setCreditsError(
        `Selected credits (${selectedCredits}) exceed your available credits (${credit}).`
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
      toast.info(
        'If you refresh the page, you will be logged out. Pages will load slow, please be patient.'
      );

      try {
        const data = { id: deviceId, name, password, mac };
        const response = await uploadDeviceData(data);
        if (response === 500) {
          toast.error('Failed to update device data.');
        } else {
          toast.success('Your device data has been updated successfully. ');
        }
      } catch (error) {
        toast.error('Failed to update device data.');
      } finally {
        setEditLoading(false);
      }
    }
  };

  const handleAddCredit = async () => {
    if (credits > 0) {
      const data = { email, id: deviceId, credits };
      toast.info(
        'If you refresh the page, you will be logged out. Pages will load slow, please be patient.'
      );
      setAddLoading(true);
      try {
        const res = await addCreditToDevice(data);
        if (res === 500) {
          toast.error('Failed to Add Credit to Device.');
        } else {
          toast.success(
            `${credits} credit${credits > 1 ? 's' : ''} has been added to you device successfully. `
          );

          setExpiry(calculateExpiryDate(credits, expiry));
          setStatus('ACTIVE');
          refetchCredit(credits);
        }
      } catch (error) {
        toast.error('Failed to update device data.');
      } finally {
        setAddLoading(false);
      }
    }
  };

  const getSelectOptions = () => {
    if (!credit) return [];
    const maxOptions = credit > 24 ? 24 : credit;
    return Array.from({ length: maxOptions }, (_, index) => (
      <MenuItem key={index + 1} value={index + 1}>
        {index + 1}
      </MenuItem>
    ));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Device</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
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
            <TextField fullWidth value={deviceId} margin="normal" disabled />
            <TextField
              fullWidth
              disabled={status === 'INACTIVE'}
              label="Password"
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
              <LoadingButton
                variant="contained"
                color="primary"
                onClick={handleEditUser}
                disabled={status === 'INACTIVE'}
                loading={editloading}
              >
                Submit
              </LoadingButton>
              <Button variant="contained" color="error" sx={{ ml: 2 }} onClick={onClose}>
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
                    Active:
                    <Label color={(status === 'INACTIVE' && 'error') || 'success'} ml={2}>
                      {status}
                    </Label>
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="h6">Credits</Typography>
              <FormControl fullWidth error={Boolean(creditsError)}>
                <InputLabel id="duration-label">Select Credits</InputLabel>
                <Select
                  labelId="duration-label"
                  value={credits}
                  onChange={handleCreditsChange}
                  label="Select Credits"
                  error={!!errors.credit}
                  helperText={errors.credit}
                  fullWidth
                  sx={{
                    color: creditsError ? 'red' : 'inherit',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: creditsError ? 'red' : 'inherit',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: creditsError ? 'red' : 'primary.main',
                    },
                    '& .MuiSelect-select': {
                      paddingRight: '32px', // Add space for the dropdown icon
                    },
                    '& .MuiSelect-icon': {
                      right: '8px', // Adjust the position of the dropdown icon
                    },
                  }}
                >
                  {getSelectOptions()}
                </Select>

                {creditsError && (
                  <FormHelperText sx={{ color: 'red' }}>{creditsError}</FormHelperText>
                )}
              </FormControl>
              <Box mt={2}>
                <LoadingButton
                  variant="contained"
                  color="primary"
                  onClick={handleAddCredit}
                  loading={addLoading}
                >
                  Submit
                </LoadingButton>
                <Button variant="contained" color="error" sx={{ ml: 2 }} onClick={onClose}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditDeviceModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  devices: PropTypes.array.isRequired,
  userDevices: PropTypes.array.isRequired,
  credit: PropTypes.number.isRequired,
  device: PropTypes.object.isRequired,
  refetchCredit: PropTypes.func.isRequired,
};
