import Cookies from 'js-cookie';
import { IoClose } from 'react-icons/io5';
import { useState, useEffect } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter } from 'src/routes/hooks';

import { useAuth } from 'src/hooks/use-auth';

import { getFacs } from 'src/lib/api/fac'; // Assume this function exists to fetch FAQs
import { getUser } from 'src/lib/api/user';
import addDevice from 'src/lib/api/addDevice';
import devicesStore from 'src/store/devicesStore';

// Custom styles for the input fields and button
const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8, // Rounded corners for input fields
    '& fieldset': {
      borderColor: '#ccc',
    },
    '&:hover fieldset': {
      borderColor: '#999',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6200ea', // Purple border when focused
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px 16px', // Padding inside the input fields
  },
});

const CustomButton = styled(Button)({
  borderRadius: 8, // Rounded button corners
  backgroundColor: '#1122FF', // Purple button background
  textTransform: 'none', // Normal case for button text
  fontSize: '16px',
  padding: '12px 16px',
  '&:hover': {
    backgroundColor: '#6a50ff', // Slightly darker purple on hover
  },
});

const FAQSection = styled('div')({
  backgroundColor: '#f9f9f9',
  padding: '16px',
  borderRadius: '8px',
  marginTop: '20px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

export default function AddDeviceView() {
  const router = useRouter();
  const user = useAuth();
  const { devices } = devicesStore((state) => state);
  const { setDevices, setUserDevices } = devicesStore();
  const [credit, setCredit] = useState(null);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mac, setMac] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const [errors, setErrors] = useState({
    username: '',
    name: '',
    password: '',
    mac: '',
    credit: '',
  });

  console.log(user);

  useEffect(() => {
    if (!Array.isArray(devices) || devices.length === 0) {
      Cookies.remove('token');
      router.push('/login');
    }
  }, [devices, router]);

  useEffect(() => {
    // New useEffect to fetch FAQs
    const fetchFAQs = async () => {
      try {
        const fetchedFAQs = await getFacs();
        setFaqs(fetchedFAQs);
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
        // Optionally set an error state or show an error message
      }
    };

    fetchFAQs();
  }, []);

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
    if (!credit) {
      newErrors.credit = 'Validity is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      setLoading(true);

      setSnackbarSeverity('success');
      setSnackbarMessage(
        'If you refresh the page, you will be logged out. Pages will load slow, please be patient.'
      );
      setSnackbarOpen(true);

      try {
        const data = { username, name, password, mac, credit };
        data.email = user.email;
        const response = await addDevice(data);
        if (response === 500) {
          setSnackbarSeverity('error');
          setSnackbarMessage('Failed to connect device. Try Again.');
          setSnackbarOpen(true);
        } else {
          setDevices(response.data);
          setUserDevices(response.userDevices);

          // Clear input fields
          setUsername('');
          setName('');
          setPassword('');
          setMac('');
          setCredit(null);

          // Open success modal instead of showing snackbar
          setOpenSuccessModal(true);
          const res = await getUser({ email: user.email });
          console.log(res);
        }
      } catch (error) {
        setSnackbarSeverity('error');
        setSnackbarMessage('Failed to connect device.');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDurationChange = (e) => {
    const newCredit = e.target.value;
    if (newCredit !== 0 && newCredit > user.credit) {
      setSnackbarSeverity('error');
      setSnackbarMessage('You do not have enough credits.');
      setSnackbarOpen(true);
    } else {
      setCredit(newCredit);
    }
  };
  // Handle closing of the snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Handle opening/closing FAQ items
  const toggleFAQ = (index) => {
    if (openFAQ === index) {
      setOpenFAQ(null); // Close if the same FAQ is clicked
    } else {
      setOpenFAQ(index); // Open the clicked FAQ
    }
  };
  return (
    <Container maxWidth="lg" sx={{ marginTop: 5 }}>
      <Grid container spacing={4}>
        {/* Left Column: Form */}
        <Grid container item xs={12} md={6}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Add Device
          </Typography>
          <Grid container item xs={12} fullWidth spacing={2} sx={{ mb: 1 }}>
            <Grid xs={3} fullWidth>
              User Id*
            </Grid>
            <Grid xs={5} fullWidth>
              <CustomTextField
                fullWidth
                placeholder="examplelogin"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
                required
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} fullWidth spacing={2} sx={{ mb: 1 }}>
            <Grid xs={3} fullWidth>
              Name*
            </Grid>
            <Grid xs={5} fullWidth>
              <CustomTextField
                fullWidth
                placeholder="Max Hodgson"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>
          </Grid>
          <Grid container item fullWidth xs={12} spacing={2} sx={{ mb: 1 }}>
            <Grid xs={3}>Password*</Grid>
            <Grid xs={5}>
              <CustomTextField
                fullWidth
                placeholder="Type a password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                required
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} fullWidth spacing={2} sx={{ mb: 1 }}>
            <Grid xs={3}>MAC*</Grid>
            <Grid xs={5}>
              <CustomTextField
                fullWidth
                placeholder="00:1A:79:__:__:__"
                variant="outlined"
                value={mac}
                onChange={(e) => setMac(e.target.value)}
                error={!!errors.mac}
                helperText={errors.mac}
                required
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={2} sx={{ mb: 1 }}>
            <Grid xs={3}>Validity</Grid>
            <Grid xs={5}>
              <FormControl fullWidth>
                <InputLabel id="duration-label">Validity</InputLabel>
                <Select
                  labelId="duration-label"
                  value={credit}
                  onChange={handleDurationChange}
                  label="Validity"
                  error={!!errors.credit}
                  helperText={errors.credit}
                  fullWidth
                >
                  {user.free_device === 1 && <MenuItem value="0">2 Days Trial</MenuItem>}
                  <MenuItem value="1">1 Month</MenuItem>
                  <MenuItem value="2">2 Months</MenuItem>
                  <MenuItem value="3">3 Months</MenuItem>
                  <MenuItem value="4">4 Months</MenuItem>
                  <MenuItem value="5">5 Months</MenuItem>
                  <MenuItem value="6">6 Months</MenuItem>
                  <MenuItem value="7">7 Months</MenuItem>
                  <MenuItem value="8">8 Months</MenuItem>
                  <MenuItem value="9">9 Months</MenuItem>
                  <MenuItem value="10">10 Months</MenuItem>
                  <MenuItem value="11">11 Months</MenuItem>
                  <MenuItem value="12">12 Months</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <CustomButton onClick={handleSubmit} variant="contained" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Submit'}
            </CustomButton>
          </Grid>
        </Grid>

        {/* Right Column: FAQ Section */}
        <Grid item xs={12} md={6}>
          <FAQSection>
            {faqs.map((faq, index) => (
              <div key={faq._id} style={{ marginTop: index === 0 ? 0 : '20px' }}>
                <Typography
                  variant="h6"
                  onClick={() => toggleFAQ(faq._id)}
                  style={{ cursor: 'pointer' }}
                >
                  {faq.title}
                </Typography>
                {openFAQ === faq._id && (
                  <Typography variant="body2" sx={{ mt: 1, borderBottom: '3px solid ', pb: 2 }}>
                    {faq.content}
                  </Typography>
                )}
              </div>
            ))}
          </FAQSection>
        </Grid>
      </Grid>

      {/* Success Modal */}
      <Dialog
        open={openSuccessModal}
        onClose={() => setOpenSuccessModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Device Added Successfully
          <IconButton
            aria-label="close"
            onClick={() => setOpenSuccessModal(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <IoClose size={24} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Your device has been added successfully.
          </Typography>
          <Typography variant="body1">
            Please add the portal URL – <strong>http://new.nexatv.be/stalker_portal/c/</strong> on
            your device or app you are using.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSuccessModal(false)} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={16000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
