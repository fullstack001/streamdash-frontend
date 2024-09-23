import { Helmet } from 'react-helmet-async';

import { Box } from '@mui/material';

import Logo from 'src/components/logo';
import ProductSideBar from 'src/components/productSideBar';

import { ProductView } from 'src/sections/product';

// ----------------------------------------------------------------------

export default function ProductPage() {
  return (
    <>
      <Helmet>
        <title> Porduct | Streamdash </title>
      </Helmet>

      {/* Flex container to align Sidebar and ProductView side by side */}
      <Logo margin={3} />
      <Box
        sx={{
          display: 'block',
          '@media (min-width: 900px)': {
            display: 'flex',
          },
        }}
      >
        {/* Sidebar Section */}
        <Box
          sx={{
            width: '100%',
            '@media (min-width: 900px)': {
              width: '50%',
            },
            display: 'flex',
          }}
        >
          <ProductSideBar />
        </Box>

        {/* Login View Section */}
        <Box flexGrow={1}>
          <ProductView />
        </Box>
      </Box>
    </>
  );
}
