import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { Modal, Alert, Button } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { useAuth } from 'src/hooks/use-auth';

import { bgGradient } from 'src/theme/css';
import userStore from 'src/store/userStore';
import getDevice from 'src/lib/api/getDevice';
import devicesStore from 'src/store/devicesStore';
import { signup, verifyEmail } from 'src/lib/api/user';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function SignupView() {
  const theme = useTheme();
  const router = useRouter();
  const { setUser } = userStore();
  const { setDevices, setUserDevices } = devicesStore();
  const user = useAuth();

  const [loading, setLoading] = useState(false);
  const [nameUser, setNameUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const validateForm = async () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    const isValid = await validateForm();
    if (!isValid) return;
    setLoading(true);
    const data = { nameUser, email, password };

    const res = await signup(data);
    if (res.status === 200) {
      setVerificationModalOpen(true); // Open the verification modal on success
      setSuccess('Signup successful! Check your email for the verification code.');
    } else {
      console.log(res.msg);
    }
    setLoading(false);
  };

  const handleVerification = async () => {
    setSnackbarSeverity('success');
    setSnackbarMessage(
      'If you refresh the page, you will be logged out. Pages will load slow, please be patient.'
    );
    setSnackbarOpen(true);
    setVerificationLoading(true);
    const res = await verifyEmail({ email, validationCode: verificationCode });
    if (res === 200) {
      setSuccess('Email verified successfully!');

      setUser({ ...user, isAuth: true });
      const response = await getDevice(email);
      if (response === 500) {
        alert('Network Error');
      } else {
        setDevices(response.data);
        setUserDevices(response.userDevice);
        router.push('/');
        setVerificationModalOpen(false); // Close the modal on success
      }
    } else {
      setVerificationError('Invalid verification code. Please try again.');
    }
    setVerificationLoading(false);
  };
  const goLogin = () => {
    router.push('/login');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const renderForm = (
    <>
      {success && <Alert severity="success">{success}</Alert>}
      <Stack spacing={3}>
        <TextField
          name="nameUser"
          label="User Name"
          value={nameUser}
          onChange={(e) => setNameUser(e.target.value)}
        />
        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setConfirmShowPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSignup}
        loading={loading}
        sx={{ marginTop: '40px' }}
      >
        Signup
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 700,
          }}
        >
          <Typography variant="h4">Create New Account</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Do have an account already?
            <Link variant="subtitle2" sx={{ ml: 0.5, cursor: 'pointer' }} onClick={goLogin}>
              Login
            </Link>
          </Typography>

          <Divider sx={{ my: 3 }}>
            {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography> */}
          </Divider>

          {renderForm}
        </Card>
      </Stack>

      {/* Modal for Email Verification */}
      <Modal
        open={verificationModalOpen}
        onClose={() => setVerificationModalOpen(false)}
        aria-labelledby="verify-email-modal"
        aria-describedby="verify-email-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Verify Your Email
          </Typography>
          <Typography sx={{ mt: 2 }}>
            We have sent a verification code to your email. Please enter it below to activate your
            account.
          </Typography>
          {verificationError && <Alert severity="error">{verificationError}</Alert>}
          <TextField
            label="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
            <Button onClick={() => setVerificationModalOpen(false)}>Cancel</Button>
            <LoadingButton
              onClick={handleVerification}
              loading={verificationLoading}
              variant="contained"
              color="primary"
            >
              Verify
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
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
