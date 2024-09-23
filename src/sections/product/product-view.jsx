import { useParams } from 'react-router-dom';
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

  const handlePayment = () => {
    const url = `https://istreamdash.com?credit=${product.credit}&price=${product.price}&email=${email}`;
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
        router.push('/');
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
      setNameUser('User name is required');
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

  const handleSignup = async () => {
    if (validateForm()) {
      // Simulate a signup action (you can replace this with an actual API call)
      const data = { nameUser, email, password };
      await signupDirectly(data);

      if (product.credit === 0) {
        const data1 = { email };
        await tryFree(data1);
      } else {
        // On successful signup, call the handlePayment function
        handlePayment(product);
      }

      // Close the modal after signing up
      setOpenModal(false);
    }
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
      <Notification />
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
            onClick={() => setOpenModal(true)}
            sx={{
              backgroundColor: '#fff',
              color: '#007bff',
            }}
          >
            {product.credit === 0 && 'Try free'}
            {product.credit > 0 && `Subscribe $${product.price}`}
          </Button>
        </Grid>
      </Paper>

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
    </Box>
  );
}
