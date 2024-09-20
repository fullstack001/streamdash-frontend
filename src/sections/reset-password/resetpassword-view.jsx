import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Card, Alert, Stack, Button, TextField, Typography } from '@mui/material';

import { resetPassword } from 'src/lib/api/user'; // Import the API for resetting the password

export default function ResetPasswordPage() {
  const theme = useTheme();

  // Get token from URL parameters (the token is sent in the reset link)
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    const data = { token, password: newPassword };

    // Call the API to reset the password
    const response = await resetPassword(data);

    if (response === 200) {
      setSuccess('Your password has been successfully reset.');

      // Redirect to the login page after a short delay (e.g., 3 seconds)
      setTimeout(() => {
        navigate('/login');
      }, 3000); // 3-second delay
    } else {
      setError('Error resetting password. Please try again.');
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
      maxWidth="700px"
    >
      <Card sx={{ p: 4, width: 400 }}>
        <Typography variant="h4" gutterBottom>
          Reset Password
        </Typography>

        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Enter your new password below.
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <Stack spacing={3} sx={{ mt: 3 }}>
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
          />

          <TextField
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
          />

          <LoadingButton
            variant="contained"
            color="primary"
            loading={loading}
            onClick={handleSubmit}
            fullWidth
          >
            Reset Password
          </LoadingButton>
        </Stack>

        <Button href="/login" sx={{ mt: 2 }} fullWidth>
          Back to Login
        </Button>
      </Card>
    </Box>
  );
}
