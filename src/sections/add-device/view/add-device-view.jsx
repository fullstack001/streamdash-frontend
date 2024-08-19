import { useState } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import addDevice from 'src/lib/api/addDevice';
import devicesStore from 'src/store/devicesStore';

export default function ProductsView() {
  const { devices } = devicesStore((state) => state);
  const { setDevices } = devicesStore();
  console.log(devices);

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mac, setMac] = useState('');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    username: '',
    name: '',
    password: '',
    mac: '',
  });

  const validate = () => {
    let isValid = true;
    const newErrors = { username: '', name: '', password: '', mac: '' };

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      setLoading(true);

      try {
        const data = { username, name, password, mac };
        const response = await addDevice(data);
        if (response === 403) {
          alert('Network Error');
        } else {
          console.log(response);
          setDevices(response.data);

          // Clear input fields
          setUsername('');
          setName('');
          setPassword('');
          setMac('');
        }
      } catch (error) {
        alert('Network Error');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Add Device
      </Typography>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <Grid container rowSpacing={2} columnSpacing={12}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="User Id"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="MAC ID"
                variant="outlined"
                value={mac}
                onChange={(e) => setMac(e.target.value)}
                error={!!errors.mac}
                helperText={errors.mac}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? (
                  <img
                    src="/assets/icons/spinner.svg"
                    alt="Loading"
                    style={{ width: 24, height: 24 }}
                  />
                ) : (
                  'Submit'
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
