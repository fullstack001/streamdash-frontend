import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { Box, Button } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { getFooter } from 'src/lib/api/footer';

import Logo from 'src/components/logo';
import ProductSideBar from 'src/components/productSideBar';

import { ProductView } from 'src/sections/product';

// ----------------------------------------------------------------------

export default function ProductPage() {
  const [footer, setFooter] = useState({});
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const res = await getFooter();
      setFooter(res);
    };
    getData();
  }, []);

  const clickLogin = () => {
    router.push('/login');
  };

  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        px: { xs: 2, md: 12 }, // Hide on xs, show on md and above
        maxWidth: '1516px',
        mx: 'auto',
      }}
    >
      <Helmet>
        <title> Porduct | Streamdash </title>
      </Helmet>

      {/* Flex container to align Sidebar and ProductView side by side */}
      <Box
        margin={3}
        padding={2}
        sx={{ display: 'flex', borderBottom: 'solid 1px #D9D9D9', justifyContent: 'space-between' }}
      >
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
      <Box
        margin={3}
        sx={{
          borderTop: 'solid 1px #D9D9D9',
          justifyContent: 'center',
          alignItems: 'center',
          '& p': {
            lineHeight: 0.6,
            mx: 'auto',
            textAlign: 'center',
          },
        }}
      >
        <p>{footer.title}</p>
        <p> {footer.content}</p>
      </Box>
    </Box>
  );
}
