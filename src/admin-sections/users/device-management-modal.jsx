import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Grid,
  Modal,
  Paper,
  Table,
  // Alert,
  Button,
  Select,
  MenuItem,
  // Snackbar,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  InputLabel,
  Typography,
  FormControl,
  Autocomplete,
  TableContainer,
} from '@mui/material';

import getDevice from '../../lib/api/getDevice';
import addDevice from '../../lib/api/addDevice';
import assignDevice from '../../lib/api/assignDevice';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 1600,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function DeviceManagementModal({ open, onClose, email, credit, user }) {
  console.log(user);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [devices, setDevices] = useState([]);
  const [userDevices, setUserDevices] = useState([]);
  const [isAssigning, setIsAssigning] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [newcredit, setNewCredit] = useState(user.free_device === 1 ? 0 : 1);
  const [mac, setMac] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    name: '',
    password: '',
    mac: '',
    credit: '',
  });
  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState('');
  // const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const validate = () => {
    let isValid = true;
    const newErrors = { username: '', name: '', password: '', mac: '', credit: '' };

    if (username.trim() === '') {
      newErrors.username = 'User Id is required.';
      isValid = false;
    } else if (devices.find((item) => item.loginId === username)) {
      newErrors.username = 'User Id already exists.';
      isValid = false;
    }
    if (name.trim() === '') {
      newErrors.name = 'Name is required.';
      isValid = false;
    }
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
    } else if (devices.find((item) => item.mac === mac)) {
      newErrors.mac = 'MAC ID already exists.';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    const fetchDevices = async () => {
      const DeviceData = await getDevice(email);
      const allDevices = DeviceData.data;
      const assignedDevices = DeviceData.userDevice;
      const allAssignedDevices = DeviceData.assignedDevices;
      const currentDevices = allDevices.filter((device) =>
        assignedDevices.some((userDevice) => userDevice.username === device.loginId)
      );

      const unAssignedDevices = allDevices.filter(
        (device) => !allAssignedDevices.some((assignedDevice) => assignedDevice.mac === device.mac)
      );

      setUserDevices(currentDevices);
      setDevices(unAssignedDevices);
    };
    fetchDevices();
  }, [email, isAdding, isAssigning]);

  const handleAddDevice = async () => {
    console.log('Click Edit', errors);
    if (validate()) {
      setIsAdding(true);

      toast.info(
        'If you refresh the page, you will be logged out. Pages will load slow, please be patient.',
        {
          position: 'top-right',
          autoClose: 16000,
        }
      );

      try {
        const data = { username, name, password, mac, credit: newcredit };
        data.email = email;
        console.log(data);
        const response = await addDevice(data);
        if (response === 500) {
          toast.error('Failed to connect device. Try Again.', {
            position: 'top-right',
          });
        } else {
          setUsername('');
          setName('');
          setPassword('');
          setMac('');
          setNewCredit(null);
          toast.success('Device added successfully.', {
            position: 'top-right',
          });
        }
      } catch (error) {
        toast.error('Failed to connect device.', {
          position: 'top-right',
        });
      } finally {
        setIsAdding(false);
      }
    }
  };

  const handleAssignDevice = async () => {
    setIsAssigning(true);
    try {
      const data = { email, device: selectedDevice };
      const res = await assignDevice(data);
      console.log(res);
    } catch (error) {
      console.error('Error assigning device:', error);
    } finally {
      setIsAssigning(false);
      setSelectedDevice(null);
    }
  };

  // const handleCloseSnackbar = () => {
  //   setSnackbarOpen(false);
  // };

  return (
    <Modal open={open} aria-labelledby="device-management-modal" sx={{ overflow: 'scroll' }}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" gutterBottom>
          Device Management for {email}
        </Typography>

        <Grid container spacing={3}>
          {/* Left column: Devices table */}
          <Grid item xs={12} md={7}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>MAC Address</TableCell>
                    <TableCell>Expiry</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userDevices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell>{device.mac}</TableCell>
                      <TableCell>{device.expiry}</TableCell>
                      <TableCell>{device.status}</TableCell>
                      {/* <TableCell>
                        <Button variant="outlined" color="secondary">
                          Remove
                        </Button>
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Right column: Add and assign device */}
          <Grid item xs={12} md={5}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Assign Device
              </Typography>
              <Autocomplete
                value={selectedDevice}
                onChange={(event, newValue) => {
                  setSelectedDevice(newValue);
                }}
                options={devices}
                getOptionLabel={(option) => option.mac}
                renderInput={(params) => <TextField {...params} label="Select a device to add" />}
                fullWidth
                sx={{ mb: 2 }}
                // Add these properties:
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionKey={(option) => option.id || `${option.mac}-${option.loginId}`}
              />
              <LoadingButton
                loading={isAssigning}
                variant="contained"
                color="primary"
                onClick={handleAssignDevice}
                fullWidth
                disabled={!selectedDevice || credit <= 0}
              >
                Assign Device
              </LoadingButton>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Add Device
              </Typography>
              <TextField
                label="User ID*"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="User Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                error={!!errors.name}
                helperText={errors.name}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                error={!!errors.password}
                helperText={errors.password}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Device MAC Address"
                placeholder="00:1A:79:__:__:__"
                fullWidth
                sx={{ mb: 2 }}
                value={mac}
                onChange={(e) => setMac(e.target.value)}
                error={!!errors.mac}
                helperText={errors.mac}
              />
              <FormControl fullWidth>
                <InputLabel id="duration-label">Validity</InputLabel>
                <Select
                  labelId="duration-label"
                  label="Validity"
                  fullWidth
                  value={newcredit}
                  onChange={(e) => setNewCredit(e.target.value)}
                >
                  {user.free_device === 1 && <MenuItem value="0">2 Days Trial</MenuItem>}
                  {[...Array(Math.min(credit, 12))].map((_, index) => (
                    <MenuItem key={index + 1} value={String(index + 1)}>
                      {index + 1} {index === 0 ? 'Month' : 'Months'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <LoadingButton
                sx={{ mt: 4 }}
                loading={isAdding}
                variant="contained"
                onClick={handleAddDevice}
                color="primary"
                fullWidth
                disabled={credit <= 0}
              >
                Add Device
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>

        <Button onClick={onClose} variant="outlined" sx={{ mt: 2 }} fullWidth>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

DeviceManagementModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  credit: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};
