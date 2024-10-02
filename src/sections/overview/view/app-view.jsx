import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { useAuth } from 'src/hooks/use-auth';

import { getUser } from 'src/lib/api/user';

import CongratulationCard from '../notification';

const credits = [
  {
    credit: 1,
    price: 20,
    text: 'Get 1 months of access for $20.',
    sutText: 'Cost per credit: $20',
    buttonText: 'Get 1 month - $20',
  },
  {
    credit: 6,
    price: 60,
    text: 'Get 6 months of access for $90.',
    sutText: 'Cost per credit: $15',
    buttonText: 'Get 6 months - $90',
  },
  {
    credit: 12,
    price: 150,
    text: 'Get 12 months of access for $150.',
    sutText: 'Cost per credit: $12.50',
    buttonText: 'Get 12 months - $150',
  },
  {
    credit: 50,
    price: 450,
    text: 'Get 50 months of access for $500.',
    sutText: 'Cost per credit: $10',
    buttonText: 'Get 50 monts - $500',
  },
];
// const products = [
//   {
//     credit: 0,
//     id: 323642,
//     price: 0,
//     text: 'Get free access for 2 days. ',
//     sutText: 'Start Free Trial',
//     buttonText: 'Start Free Trial',
//   },
// ];

export default function AppView() {
  const router = useRouter();
  const [showFreeNo, setShowFreeNo] = useState(false);
  const [windowClosed, setWindowClosed] = useState(false);
  const user = useAuth();
  const handleGridClick = (credit) => {
    const url = `https://istreamdash.com?credit=${credit.credit}&price=${credit.price}&email=${user.email}`;
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
        const res = await getUser({ email: user.email });
        console.log(res);
        router.push('/add-device');
      } catch (error) {
        console.log(error);
      }
    };
    if (windowClosed) {
      getUserData();
      setWindowClosed(false); // Reset state if needed
    }
  }, [windowClosed, user, router]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Buy Credit
      </Typography>
      <CongratulationCard />

      {(user.credit && user.credit) < 1 && (
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#fff59d',
            p: 2,
            borderRadius: 1,
            border: 1,
            borderColor: '#fbc02d',
            mt: 3,
            mb: 5,
          }}
        >
          <Typography variant="body1" color="yellow.dark">
            ⚠️ Not enough credits. Please, refill your balance.
          </Typography>
        </Grid>
      )}

      <Grid container sx={{ maxWidth: 1000, margin: '0px auto' }} spacing={3}>
        <Grid
          item
          xs={12}
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
                Free Trial
              </Typography>
              <Typography>Get free access for 2 days.</Typography>
              <Typography>Start Free Trial</Typography>
            </Box>
            <Button
              onClick={() => setShowFreeNo(true)}
              variant="contained"
              sx={{
                backgroundColor: '#fff',
                color: '#157EE3',
                width: '260px',
                fontSize: '24px',
                padding: '10px',
                ':hover': {
                  color: '#FFFFFF',
                },
              }}
            >
              Start Free Trial
            </Button>
          </Grid>
        </Grid>

        {credits.map((prod) => (
          <Grid
            item
            xs={12}
            key={prod.credit}
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
                  {prod.credit} {prod.credit === 1 && 'credit'}
                  {prod.credit > 1 && 'credits'}
                </Typography>
                <Typography>{prod.text}</Typography>
                <Typography>{prod.sutText}</Typography>
              </Box>
              <Button
                onClick={() => {
                  handleGridClick(prod);
                }}
                variant="contained"
                sx={{
                  backgroundColor: '#fff',
                  color: '#157EE3',
                  width: '260px',
                  fontSize: '24px',
                  padding: '10px',
                  ':hover': {
                    color: '#FFFFFF',
                  },
                }}
              >
                {prod.buttonText}
              </Button>
            </Grid>
          </Grid>
        ))}
        {showFreeNo && (
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
              Your trial is now active. Please{' '}
              <Link to="/add-device" style={{ color: '#df3405', textDecoration: 'underline' }}>
                add a device
              </Link>{' '}
              of your choice to test drive.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
