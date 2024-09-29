import { Helmet } from 'react-helmet-async';

import { Box } from '@mui/material';

import Logo from 'src/components/logo';
import ProductSideBar from 'src/components/productSideBar';

import { ProductView } from 'src/sections/product';

// ----------------------------------------------------------------------

export default function ProductPage() {
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
      <Logo margin={3} />
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
