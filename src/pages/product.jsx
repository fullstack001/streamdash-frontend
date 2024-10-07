import DOMPurify from 'dompurify'; // Add this import
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { Box, Button, Typography } from '@mui/material'; // Add Typography

import { useRouter } from 'src/routes/hooks';

import { getFooter } from 'src/lib/api/footer';
import { useLocationStore } from 'src/store/locationStore'; // Update this import

import Logo from 'src/components/logo';
import ProductSideBar from 'src/components/productSideBar';

import { ProductView } from 'src/sections/product';

// Add this new component at the top of your file, outside the main component
const SafeHTML = ({ html }) => (
  // eslint-disable-next-line react/no-danger
  <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html || '') }} />
);

SafeHTML.propTypes = {
  html: PropTypes.string.isRequired,
};
// ----------------------------------------------------------------------

export default function ProductPage() {
  const [footer, setFooter] = useState({});
  const router = useRouter();
  const { country } = useLocationStore(); // Rename to storeCurrency

  useEffect(() => {
    const getFooterData = async () => {
      const footerRes = await getFooter();
      setFooter(footerRes);
    };
    getFooterData();
  }, []);

  const clickLogin = () => {
    router.push('/login');
  };

  // Update this function to return image URLs
  const getCountryInfo = () => {
    console.log(country);
    if (!country) return { flagUrl: '/assets/images/world-flag.png', currency: 'US Dollar (USD)' };

    if (country === 'canada')
      return { flagUrl: '/assets/images/canada-flag.png', currency: 'Canadian Dollar (CAD)' };
    if (country === 'USA' || country === 'united states')
      return { flagUrl: '/assets/images/us-flag.png', currency: 'US $ (USD)' };
    return { flagUrl: '/assets/images/world-flag.png', currency: 'US $ (USD)' };
  };

  const { flagUrl, currency } = getCountryInfo();

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
        <title>Streamdash – Stream TV Better </title>
      </Helmet>

      {/* Flex container to align Sidebar and ProductView side by side */}
      <Box
        margin={3}
        padding={2}
        sx={{
          display: 'flex',
          borderBottom: 'solid 1px #D9D9D9',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Logo />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              border: 'solid 1px #D9D9D9',
              padding: '5px',
              borderRadius: '5px',
            }}
          >
            <img src={flagUrl} alt="Country flag" width={24} height={16} />
            {currency}
          </Typography>
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
          <ProductView currency={currency === 'US Dollar (USD)' ? 'priceUSD' : 'priceCAD'} />
        </Box>
      </Box>
      <Box
        margin={3}
        sx={{
          borderTop: 'solid 1px #D9D9D9',
          justifyContent: 'center',
          alignItems: 'center',
          '& p': {
            lineHeight: 1.5,
            mx: 'auto',
            textAlign: 'center',
          },
        }}
      >
        {footer.title && (
          <p>
            <SafeHTML html={footer.title} />
          </p>
        )}
        {footer.content && (
          <p>
            <SafeHTML html={footer.content} />
          </p>
        )}
      </Box>
    </Box>
  );
}
