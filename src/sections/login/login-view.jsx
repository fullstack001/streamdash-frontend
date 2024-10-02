import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { useAuth } from 'src/hooks/use-auth';

import { signIn, sendPasswordReset } from 'src/lib/api/user'; // Add password reset API
import { bgGradient } from 'src/theme/css';
import userStore from 'src/store/userStore';
import getDevice from 'src/lib/api/getDevice';
import devicesStore from 'src/store/devicesStore';

import Iconify from 'src/components/iconify';

import { isAdmin } from './util';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();
  const { setUser } = userStore();
  const { setDevices, setUserDevices } = devicesStore();
  const authUser = useAuth();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [openForgotPassword, setOpenForgotPassword] = useState(false); // Modal state
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false); // Add this state

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Handle modal open/close
  const handleOpenForgotPassword = () => setOpenForgotPassword(true);
  const handleCloseForgotPassword = () => setOpenForgotPassword(false);

  // Handle password reset request
  const handleResetPassword = async () => {
    setResetLoading(true);

    const res = await sendPasswordReset({ email: resetEmail });
    if (res === 200) {
      setResetMessage('Password reset link has been sent to your email.');
      setResetSuccess(true); // Set this to true on success
    } else {
      setResetMessage('Error sending password reset link. Please try again.');
    }
    setResetLoading(false);
  };

  const handleClick = async () => {
    setLoading(true);

    const data = { email, password };
    const res = await signIn(data);
    if (res === 200) {
      console.log(authUser);
      setUser({ ...authUser, isAuth: true });
      setSnackbarSeverity('success');
      setSnackbarMessage(
        'If you refresh the page, you will be logged out. Pages will load slow, please be patient.'
      );
      setSnackbarOpen(true);
      const response = await getDevice(email);
      if (response === 500) {
        alert('Network Error');
      } else {
        setDevices(response.data);
        setUserDevices(response.userDevice);
        router.push(isAdmin() ? '/admin' : '/dashboard');
      }
    } else if (res.msg === 'email') {
      setEmailError('User not found.');
    } else if (res.msg === 'password') {
      setPasswordError('Invalid Password');
    }
    setLoading(false);
  };
  console.log(emailError);

  const goSignup = () => {
    router.push('/signup');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const renderForm = (
    <>
      <Stack spacing={3} maxWidth="700px">
        <TextField
          name="email"
          label="Email address"
          error={!!emailError}
          helperText={emailError}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          error={!!passwordError}
          helperText={passwordError}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link
          variant="subtitle2"
          underline="hover"
          sx={{ cursor: 'pointer' }}
          onClick={handleOpenForgotPassword}
        >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        loading={loading}
      >
        Login
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
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Streamdash</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5, cursor: 'pointer' }} onClick={goSignup}>
              Create new account
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>

      {/* Modal for Forgot Password */}
      <Modal open={openForgotPassword} onClose={handleCloseForgotPassword}>
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
            Forgot Password?
          </Typography>
          <TextField
            fullWidth
            label="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            sx={{ mt: 2 }}
          />
          {resetMessage && (
            <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
              {resetMessage}
            </Typography>
          )}
          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
            {resetSuccess ? (
              <Button onClick={handleCloseForgotPassword}>Close</Button>
            ) : (
              <>
                <Button onClick={handleCloseForgotPassword}>Cancel</Button>
                <LoadingButton
                  onClick={handleResetPassword}
                  loading={resetLoading}
                  variant="contained"
                >
                  Send Reset Link
                </LoadingButton>
              </>
            )}
          </Stack>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={8000}
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
