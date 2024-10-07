import PropTypes from 'prop-types';
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
import { fetchProducts } from 'src/lib/api/products';
import { signIn, tryFree, getUserPayment, signupDirectly } from 'src/lib/api/user';

import Notification from './notification';

export default function ProductView({ currency }) {
  const { product_id } = useParams();
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(null);
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
    const url = `https://istreamdash.com?credit=${currentProduct.credit}&price=${
      currentProduct[currency]
    }&email=${email}&currency=${currency === 'priceUSD' ? 'usd' : 'cad'}`;
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
        if (prod.credit === 0) {
          const data1 = { email };
          await tryFree(data1);
          setShowMessage(true);
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

  const generateProductText = (prod) => {
    if (prod.credit === '0') return 'Get free access for 2 days.';
    return `Get ${prod.credit} month${Number(prod.credit) > 1 ? 's' : ''} of access for ${
      prod[currency]
    } ${currency === 'priceUSD' ? 'USD' : 'CAD'}.`;
  };

  const generateProductSubText = (prod) => {
    if (prod.credit === '0') return 'Start Free Trial';
    const costPerCredit = (prod[currency] / prod.credit).toFixed(2);
    return `Cost per credit: ${costPerCredit} ${currency === 'priceUSD' ? 'USD' : 'CAD'}`;
  };

  const generateButtonText = (prod) => {
    if (prod.credit === '0') return 'Start Free Trial';
    return `Get ${prod.credit} month${prod.credit > 1 ? 's' : ''} - ${prod[currency]}${
      currency === 'priceUSD' ? 'USD' : 'CAD'
    }`;
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        console.log(fetchedProducts);
        setProducts(fetchedProducts);
        if (product_id) {
          const selectedProduct = fetchedProducts.find((item) => item.id === product_id);
          setProduct(selectedProduct);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    getProducts();
  }, [product_id]);

  return (
    <>
      {products && (
        <Box sx={{ padding: '20px', margin: 'auto' }}>
          <Grid container>
            <Grid item xs={12} md={6} sx={{ padding: { xs: '20px', md: '40px' } }}>
              <Typography
                sx={{ fontSize: { xs: '30px', md: '45px' }, fontWeight: '600' }}
                gutterBottom
                color="#156BE2"
              >
                Discover the powerful features
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '18px', md: '25px' },
                  fontWeight: '300',
                  marginBottom: '10px',
                }}
                color="textSecondary"
              >
                Access stalker portal (MAC ID) based IPTV service to connect your streaming device.
                Our self-managed dashboard allows you to take control and get instant access.
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
                  sx={{
                    fontSize: { xs: '18px', md: '25px' },
                    fontWeight: '500',
                    marginLeft: '10px',
                  }}
                >
                  Get instance access – connect your device in minutes
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
                  sx={{
                    fontSize: { xs: '18px', md: '25px' },
                    fontWeight: '500',
                    marginLeft: '10px',
                  }}
                >
                  Your credits never expire!
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
                  sx={{
                    fontSize: { xs: '18px', md: '25px' },
                    fontWeight: '500',
                    marginLeft: '10px',
                  }}
                >
                  Connect unlimited devices
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
                  sx={{
                    fontSize: { xs: '18px', md: '25px' },
                    fontWeight: '500',
                    marginLeft: '10px',
                  }}
                >
                  Around the clock customer support
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
                              {prod.credit === '0' ? 'Free Trial' : prod.credit}{' '}
                              {prod.credit === '1' && 'Credit'}
                              {Number(prod.credit) > 1 && 'Credits'}
                            </Typography>
                            <Typography>{generateProductText(prod)}</Typography>
                            <Typography>{generateProductSubText(prod)}</Typography>
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
                              width: '300px',
                              fontSize: '20px',
                              padding: '10px 0',
                              ':hover': {
                                color: '#FFFFFF',
                              },
                            }}
                          >
                            {generateButtonText(prod)}
                          </Button>
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
                          {product.credit === 1 && 'Credit'}
                          {product.credit > 1 && 'Credits'}
                        </Typography>
                        <Typography>{generateProductText(product)}</Typography>
                        <Typography>{generateProductSubText(product)}</Typography>
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
                          width: '300px',
                          fontSize: '20px',
                          padding: '10px 0',
                          ':hover': {
                            color: '#FFFFFF',
                          },
                        }}
                      >
                        {generateButtonText(product)}
                      </Button>
                    </Grid>
                  </Paper>
                )}
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
                    <Button variant="contained" onClick={() => handleSignup(currentProduct)}>
                      Continue
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
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
    </>
  );
}

ProductView.propTypes = {
  currency: PropTypes.string.isRequired,
};
