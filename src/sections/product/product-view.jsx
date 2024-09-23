import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import {
  Box,
  Grid,
  Paper,
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { tryFree, signupDirectly } from 'src/lib/api/user';

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
  const router = useRouter();

  const [windowClosed, setWindowClosed] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

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
        setShowMessage(true);
      } catch (error) {
        console.log(error);
      }
    };
    if (windowClosed) {
      getUserData();
      setWindowClosed(false); // Reset state if needed
    }
  }, [windowClosed, router]);

  const validateForm = () => {
    let isValid = true;
    if (nameUser === '') {
      setUserError('User name is required');
      isValid = false;
    } else {
      setUserError('');
    }

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

    return isValid;
  };

  const handleSignup = async (prod) => {
    if (validateForm()) {
      const data = { nameUser, email, password };
      await signupDirectly(data);

      if (product.credit === 0) {
        const data1 = { email };
        await tryFree(data1);
      } else {
        handlePayment(prod);
      }

      setOpenModal(false); // Close the modal after signing up
    }
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
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
                backgroundColor: '#007bff',
                color: '#f5f5f5',
              }}
            >
              <Grid container justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }} mb={2}>
                    {prod.credit === 0 ? 'Free Trial' : prod.credit} {prod.credit === 1 && 'credit'}
                    {prod.credit > 1 && 'credits'}
                  </Typography>
                  <Typography>Enjoy a full month of IPTV</Typography>
                  {/* <Typography>
                    {prod.credit === 0 && 'Free Trial'}
                    {prod.credit > 0 && `Subscribe $${prod.price}`}
                  </Typography> */}
                </Box>
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpenModal(true);
                    setCurrentProduct(prod);
                  }}
                  sx={{
                    backgroundColor: '#fff',
                    color: '#007bff',
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
                      label="UserName"
                      type="text"
                      fullWidth
                      value={nameUser}
                      onChange={(e) => setNameUser(e.target.value)}
                      error={!!userError}
                      helperText={userError}
                      sx={{ marginBottom: '16px' }}
                    />
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
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => handleSignup(prod)}>
                      Confirm
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
                color: '#007bff',
              }}
            >
              {product.credit === 0 && 'Try free'}
              {product.credit > 0 && `Subscribe $${product.price}`}
            </Button>

            {/* Modal for Email and Password Signup */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
              <DialogTitle>Sign up to continue</DialogTitle>
              <DialogContent>
                <TextField
                  label="UserName"
                  type="text"
                  fullWidth
                  value={nameUser}
                  onChange={(e) => setNameUser(e.target.value)}
                  error={!!userError}
                  helperText={userError}
                  sx={{ marginBottom: '16px' }}
                />
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
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                <Button variant="contained" onClick={handleSignup}>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Paper>
      )}
      {showMessage && (
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#9dd7ff',
            p: 2,
            borderRadius: 1,
            border: 1,
            borderColor: '#2c468a',
            mt: 3,
            mb: 5,
          }}
        >
          <Typography variant="body1" color="yellow.dark">
            Email sent successfully to your email address{' '}
            <Link to="/login" style={{ color: '#df3405', textDecoration: 'underline' }}>
              Login
            </Link>{' '}
          </Typography>
        </Grid>
      )}
    </Box>
  );
}
