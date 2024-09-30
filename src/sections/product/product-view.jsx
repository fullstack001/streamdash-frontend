import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Grid,
  Paper,
  Alert,
  Button,
  Dialog,
  Snackbar,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useAuth } from 'src/hooks/use-auth';

import userStore from 'src/store/userStore';
import getDevice from 'src/lib/api/getDevice';
import devicesStore from 'src/store/devicesStore';
import { signIn, tryFree, getUserPayment, signupDirectly } from 'src/lib/api/user';

import Notification from './notification';

const products = [
  { credit: 0, id: 323642, price: 0 },
  { credit: 1, id: 453423, price: 20 },
  { credit: 6, id: 975645, price: 60 },
  { credit: 12, id: 346345, price: 150 },
  { credit: 50, id: 675454, price: 450 },
  { credit: 'all', id: 934323 },
];

export default function ProductView() {
  const { product_id } = useParams();
  const product = products.find((item) => item.id === Number(product_id));
  const { setUser } = userStore();
  const router = useRouter();
  const authUser = useAuth();
  const { setDevices, setUserDevices } = devicesStore();

  const [loading, setLoading] = useState(false);
  const [windowClosed, setWindowClosed] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handlePayment = () => {
    const url = `https://istreamdash.com?credit=${currentProduct.credit}&price=${currentProduct.price}&email=${email}`;
    const newWindow = window.open(url, '_blank', 'width=800,height=650');

    const interval = setInterval(() => {
      if (newWindow.closed) {
        clearInterval(interval);
        setWindowClosed(true);
      }
    }, 500);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const procecces = await getUserPayment({ email });
        if (procecces) {
          setShowMessage(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (windowClosed) {
      getUserData();
      setWindowClosed(false); // Reset state if needed
    }
  }, [windowClosed, authUser, email]);

  const validateForm = () => {
    let isValid = true;

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Confirm Password is required');
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    }

    return isValid;
  };

  const handleClickSignin = async () => {
    setLoading(true);
    setSnackbarSeverity('success');
    setSnackbarMessage(
      'If you refresh the page, you will be logged out. Pages will load slow, please be patient.'
    );
    setSnackbarOpen(true);
    const data = { email, password };
    const res = await signIn(data);
    if (res === 200) {
      console.log(authUser);
      setUser({ ...authUser, isAuth: true });
      const response = await getDevice(email);
      if (response === 500) {
        alert('Network Error');
      } else {
        setDevices(response.data);
        setUserDevices(response.userDevice);
        router.push('/add-device');
      }
    }
    setLoading(false);
  };

  const handleSignup = async (prod) => {
    if (validateForm()) {
      const data = { email, password };
      const response = await signupDirectly(data);

      if (response.status === 200) {
        if (product.credit === 0) {
          const data1 = { email };
          await tryFree(data1);
        } else {
          handlePayment(prod);
        }
        setOpenModal(false); // Close the modal after signing up
      } else if (response.status === 500) {
        if (response.msg === 'exist') {
          setEmailError('User already exist. Please signin');
        }
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Box sx={{ padding: '20px', margin: 'auto' }}>
        <Grid container>
          <Grid item xs={12} md={6} sx={{ padding: { xs: '20px', md: '40px' } }}>
            <Typography
              sx={{ fontSize: { xs: '30px', md: '45px' }, fontWeight: '600' }}
              gutterBottom
              color="#156BE2"
            >
              Discover the power of our IPTV services
            </Typography>
            <Typography
              sx={{ fontSize: { xs: '18px', md: '25px' }, fontWeight: '300', marginBottom: '10px' }}
              color="textSecondary"
            >
              Choose the plan that fits your needs and enjoy seamless streaming of a wide variety of
              channels and thousands of VODs.
            </Typography>
            <Box sx={{ display: 'flex', marginTop: '10px' }}>
              <img
                width="25px"
                height="25px"
                style={{ marginTop: '5px' }}
                src="/assets/icons/round_check.svg"
                alt="Smart TV"
              />
              <Typography
                sx={{ fontSize: { xs: '18px', md: '25px' }, fontWeight: '500', marginLeft: '10px' }}
              >
                Access over 9,000 live channels
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', marginTop: '10px' }}>
              <img
                width="25px"
                height="25px"
                style={{ marginTop: '5px' }}
                src="/assets/icons/round_check.svg"
                alt="Smart TV"
              />
              <Typography
                sx={{ fontSize: { xs: '18px', md: '25px' }, fontWeight: '500', marginLeft: '10px' }}
              >
                Money-back guarantee for peace of mind
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', marginTop: '10px' }}>
              <img
                width="25px"
                height="25px"
                style={{ marginTop: '5px' }}
                src="/assets/icons/round_check.svg"
                alt="Smart TV"
              />
              <Typography
                sx={{ fontSize: { xs: '18px', md: '25px' }, fontWeight: '500', marginLeft: '10px' }}
              >
                Simple set-up. Perfect privacy
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', marginTop: '10px' }}>
              <img
                width="25px"
                height="25px"
                style={{ marginTop: '5px' }}
                src="/assets/icons/round_check.svg"
                alt="Smart TV"
              />
              <Typography
                sx={{ fontSize: { xs: '18px', md: '25px' }, fontWeight: '500', marginLeft: '10px' }}
              >
                Money-back guarantee for peace of mind
              </Typography>
            </Box>
            <img src="/assets/images/product-sub.png" width="80%" alt="" />
          </Grid>
          {showMessage ? (
            <Grid item xs={12} md={6}>
              {/* Login form */}
              <Paper elevation={4} sx={{ mt: 12, padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h6" gutterBottom>
                  Your payment has been successfully processed.
                  <br /> Please login below to add your device.
                </Typography>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!emailError}
                  helperText={emailError}
                  sx={{ marginBottom: '16px' }}
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                  sx={{ marginBottom: '16px' }}
                />
                <LoadingButton
                  variant="contained"
                  color="primary"
                  loading={loading}
                  onClick={handleClickSignin}
                  fullWidth
                >
                  Log In
                </LoadingButton>
              </Paper>
            </Grid>
          ) : (
            <Grid item xs={12} md={6}>
              <Notification />

              {/* Check if product.credit is 'all' */}
              {product.credit === 'all' ? (
                products
                  .filter((prod) => prod.credit !== 'all') // Filter out 'all' itself
                  .map((prod) => (
                    <Paper
                      key={prod.id}
                      elevation={4}
                      sx={{
                        padding: '16px',
                        marginBottom: '16px',
                        border: '1px solid #ddd',
                        backgroundColor: '#157EE3',
                        color: '#f5f5f5',
                      }}
                    >
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography sx={{ fontWeight: 'bold', fontSize: '40px' }} mb={2}>
                            {prod.credit === 0 ? 'Free Trial' : prod.credit}{' '}
                            {prod.credit === 1 && 'credit'}
                            {prod.credit > 1 && 'credits'}
                          </Typography>
                          <Typography>Enjoy a full month of IPTV</Typography>
                          <Typography>
                            {prod.credit === 0 && 'Free Trial'}
                            {prod.credit > 0 && `Subscribe $${prod.price}`}
                          </Typography>
                        </Box>
                        <Button
                          onClick={() => {
                            setOpenModal(true);
                            setCurrentProduct(prod);
                          }}
                          variant="contained"
                          sx={{
                            backgroundColor: '#fff',
                            color: '#157EE3',
                            width: '243px',
                            fontSize: '24px',
                            padding: '10px',
                          }}
                        >
                          {prod.credit === 0 && 'Try free'}
                          {prod.credit > 0 && `Subscribe $${prod.price}`}
                        </Button>

                        {/* Modal for Email and Password Signup */}
                        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                          <DialogTitle>Sign up to continue</DialogTitle>
                          <DialogContent>
                            <TextField
                              label="Email"
                              type="email"
                              fullWidth
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              error={!!emailError}
                              helperText={emailError}
                              sx={{ my: 2 }}
                            />
                            <TextField
                              label="Password"
                              type="password"
                              fullWidth
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              error={!!passwordError}
                              helperText={passwordError}
                              sx={{ mb: 2 }}
                            />
                            <TextField
                              label="Confirm Password"
                              type="password"
                              fullWidth
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              error={!!confirmPasswordError}
                              helperText={confirmPasswordError}
                              sx={{ marginBottom: '16px' }}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                            <Button variant="contained" onClick={() => handleSignup(prod)}>
                              Continue
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Grid>
                    </Paper>
                  ))
              ) : (
                <Paper
                  elevation={4}
                  sx={{
                    padding: '16px',
                    marginBottom: '16px',
                    border: '1px solid #ddd',
                    backgroundColor: '#007bff',
                    color: '#f5f5f5',
                  }}
                >
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }} mb={2}>
                        {product.credit === 0 ? 'Free Trial' : product.credit}{' '}
                        {product.credit === 1 && 'credit'}
                        {product.credit > 1 && 'credits'}
                      </Typography>
                      <Typography>Enjoy a full month of IPTV</Typography>
                      <Typography>
                        {product.credit === 0 && 'Free Trial'}
                        {product.credit > 0 && `Subscribe $${product.price}`}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setOpenModal(true);
                        setCurrentProduct(product);
                      }}
                      sx={{
                        backgroundColor: '#fff',
                        color: '#157EE3',
                        width: '243px',
                        fontSize: '24px',
                        padding: '10px',
                      }}
                    >
                      {product.credit === 0 && 'Try free'}
                      {product.credit > 0 && `Subscribe $${product.price}`}
                    </Button>
                  </Grid>
                </Paper>
              )}
            </Grid>
          )}
        </Grid>
      </Box>
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
    </>
  );
}
