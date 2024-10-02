import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useAuth } from 'src/hooks/use-auth';

import { bgGradient } from 'src/theme/css';
import userStore from 'src/store/userStore';
import { updateProfile, updatePassword } from 'src/lib/api/user';

import Iconify from 'src/components/iconify';

export default function ProfileEditView() {
  const theme = useTheme();
  const { setUser } = userStore();
  const authUser = useAuth();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(''); // For email validation

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(''); // For password validation

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Validate email
  const validateEmail = () => {
    if (email.trim() === '') {
      setEmailError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Validate password fields
  const validatePasswords = () => {
    if (newPassword.trim() === '' || confirmPassword.trim() === '') {
      setPasswordError('All password fields are required');
      return false;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      return false;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }

    setPasswordError('');
    return true;
  };

  // Handle profile update request
  const handleUpdateProfile = async () => {
    if (!validateEmail()) return;

    setLoading(true);
    const data = {
      oldEmail: authUser.email,
      email,
    };

    const res = await updateProfile(data);
    if (res.status !== 500) {
      setSnackbarSeverity('success');
      setSnackbarMessage('Email updated successfully.');
      setUser({ ...authUser, email });
    } else if (res.msg === 'exist') {
      setEmailError('Email already Exist');
      setSnackbarSeverity('error');
      setSnackbarMessage('Error updating email. Please try again.');
    }
    setLoading(false);
    setSnackbarOpen(true);
  };

  // Handle password update request (without current password)
  const handleUpdatePassword = async () => {
    if (!validatePasswords()) return;

    setPasswordLoading(true);
    const data = {
      newPassword,
      email: authUser.email,
    };

    const res = await updatePassword(data);
    if (res !== 200) {
      setSnackbarSeverity('success');
      setSnackbarMessage('Password updated successfully.');
    } else {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error updating password. Please try again.');
    }
    setPasswordLoading(false);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const renderProfileForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        variant="contained"
        color="inherit"
        onClick={handleUpdateProfile}
        loading={loading}
        sx={{ marginTop: '20px' }}
      >
        Update Email
      </LoadingButton>
    </>
  );

  const renderPasswordForm = (
    <>
      <Stack spacing={3} sx={{ marginTop: '30px' }}>
        <TextField
          name="newPassword"
          label="New Password"
          type={showNewPassword ? 'text' : 'password'}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                  <Iconify icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type={showNewPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                  <Iconify icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        variant="contained"
        color="inherit"
        onClick={handleUpdatePassword}
        loading={passwordLoading}
        sx={{ marginTop: '20px' }}
      >
        Update Password
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
            maxWidth: 500,
          }}
        >
          <Typography variant="h4">Edit Profile</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Update your email, or change your password.
          </Typography>

          {renderProfileForm}
          {renderPasswordForm}
        </Card>
      </Stack>

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
