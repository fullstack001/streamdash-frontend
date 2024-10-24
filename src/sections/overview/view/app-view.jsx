import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { useAuth } from 'src/hooks/use-auth';

import { getUser, tryFree } from 'src/lib/api/user';
import { fetchProducts } from 'src/lib/api/products';
import { useCreditStore } from 'src/store/creditStore';
import { useLocationStore } from 'src/store/locationStore';

import CongratulationCard from '../notification';
import TrialActivatedPopup from '../TrialActivatePopup';

export default function AppView() {
  const { country } = useLocationStore(); // Rename to storeCurrency
  const currency = country === 'canada' ? 'priceCAD' : 'priceUSD';
  const { setCreditFuntion } = useCreditStore();
  const router = useRouter();
  const [showFreeNo, setShowFreeNo] = useState(false);
  const [windowClosed, setWindowClosed] = useState(false);
  const [showTrialPopup, setShowTrialPopup] = useState(false); // Add this state
  const [products, setProducts] = useState(null);
  const user = useAuth();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        console.log(fetchedProducts);
        setProducts(fetchedProducts.filter((item) => item.credit !== 'all' && item.credit !== '0'));
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    getProducts();
  }, []);

  const handleGridClick = (product) => {
    const url = `https://istreamdash.com/pay?credit=${product.credit}&price=${
      product[currency]
    }&email=${user.email}&currency=${currency === 'priceUSD' ? 'usd' : 'cad'}`;
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
        await getUser({ email: user.email });
        setCreditFuntion();
        router.push('/add-device');
      } catch (error) {
        console.log(error);
      }
    };
    if (windowClosed) {
      getUserData();
      setWindowClosed(false);
    }
  }, [windowClosed, user, router, setCreditFuntion]);

  const freeActive = async () => {
    const res = await tryFree({ email: user.email });
    console.log(res);
    setShowTrialPopup(true);
    setShowFreeNo(true);
  };

  const generateProductText = (prod) => {
    if (prod.credit === '0') return 'Get free access for 2 days.';
    return `Get ${prod.credit} month${Number(prod.credit) > 1 ? 's' : ''} of access for $${
      prod[currency]
    }.`;
  };

  const generateProductSubText = (prod) => {
    if (prod.credit === '0') return 'No credit card required';
    const costPerCredit = (prod[currency] / prod.credit).toFixed(2);
    return `Cost per credit: $${costPerCredit}`;
  };

  const generateButtonText = (prod) => {
    if (prod.credit === '0') return 'Start Free Trial';
    return `Get ${prod.credit} month${prod.credit > 1 ? 's' : ''} - $${prod[currency]}`;
  };

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

      <Grid container sx={{ margin: '0px auto' }} spacing={3}>
        {user.free_device === 0 && (
          <Grid
            item
            xs={12}
            md={6}
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
                onClick={freeActive}
                variant="contained"
                sx={{
                  backgroundColor: '#fff',
                  color: '#157EE3',
                  width: '320px',
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
        )}

        {products &&
          products.map((prod) => (
            <Grid
              item
              xs={12}
              md={6}
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
                    {prod.credit} {prod.credit === '1' && 'Credit'}
                    {prod.credit > 1 && 'Credits'}
                  </Typography>
                  <Typography>{generateProductText(prod)}</Typography>
                  <Typography>{generateProductSubText(prod)}</Typography>
                </Box>
                <Button
                  onClick={() => {
                    handleGridClick(prod);
                  }}
                  variant="contained"
                  sx={{
                    backgroundColor: '#fff',
                    color: '#157EE3',
                    width: '320px',
                    fontSize: '24px',
                    padding: '10px',
                    ':hover': {
                      color: '#FFFFFF',
                    },
                  }}
                >
                  {generateButtonText(prod)}
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
        {showTrialPopup && (
          <TrialActivatedPopup
            onClose={() => {
              setShowTrialPopup(false);
              router.push('/add-device');
            }}
          />
        )}
      </Grid>
    </Container>
  );
}
