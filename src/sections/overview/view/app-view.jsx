import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { useAuth } from 'src/hooks/use-auth';

import { getUser } from 'src/lib/api/user';

import CongratulationCard from '../notification';
import AppWidgetSummary from '../app-widget-summary';

const credits = [
  { credit: 1, price: 20 },
  { credit: 6, price: 60 },
  { credit: 12, price: 150 },
  { credit: 50, price: 450 },
];

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
        router.push('/');
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
      <CongratulationCard user={user.name} />

      <Grid container sx={{ maxWidth: 1000, margin: '0px auto' }} spacing={3}>
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
        <Grid item xs={12} sm={6} md={3} onClick={() => setShowFreeNo(true)}>
          <AppWidgetSummary
            sx={{
              cursor: 'pointer',
              border: '1px solid transparent',
              transition: 'border-color 0.3s, box-shadow 0.3s',
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: 3,
              },
            }}
            title="Credit"
            total="Free"
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        {credits.map((credit) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={credit.credit}
            onClick={() => handleGridClick(credit)}
          >
            <AppWidgetSummary
              sx={{
                cursor: 'pointer',
                border: '1px solid transparent',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: 3,
                },
              }}
              title={credit.credit === 1 ? 'Credit' : 'Credits'}
              total={credit.credit}
              color="success"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            />
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
