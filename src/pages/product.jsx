import { Helmet } from 'react-helmet-async';

import { Box, Button } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import Logo from 'src/components/logo';
import ProductSideBar from 'src/components/productSideBar';

import { ProductView } from 'src/sections/product';

// ----------------------------------------------------------------------

export default function ProductPage() {
  const router = useRouter();

  const clickLogin = () => {
    router.push('/login');
  };

  return (
    <Box
      sx={{
        px: { xs: 2, md: 12 }, // Hide on xs, show on md and above
      }}
    >
      <Helmet>
        <title> Porduct | Streamdash </title>
      </Helmet>

      {/* Flex container to align Sidebar and ProductView side by side */}
      <Box margin={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo />
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: 4,
            padding: '10px 20px',
          }}
          onClick={clickLogin}
        >
          Login
        </Button>
      </Box>
      <Box
        sx={{
          display: 'block',
        }}
      >
        {/* Sidebar Section */}

        <ProductSideBar />

        {/* Login View Section */}
        <Box>
          <ProductView />
        </Box>
      </Box>
    </Box>
  );
}
