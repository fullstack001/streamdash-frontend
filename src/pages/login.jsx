import { Helmet } from 'react-helmet-async';

import { Box } from '@mui/material';

import IndexSideBar from 'src/components/indexSidebar';

import { LoginView } from 'src/sections/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | Streamdash </title>
      </Helmet>

      {/* Flex container to align Sidebar and LoginView side by side */}
      <Box
        sx={{
          paddingTop: '50px',
          display: 'block',
          '@media (min-width: 900px)': {
            display: 'flex',
          },
        }}
        minHeight="100vh"
      >
        {/* Sidebar Section */}
        <Box
          sx={{
            width: '100%',
            '@media (min-width: 900px)': {
              width: '50%',
            },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IndexSideBar />
        </Box>

        {/* Login View Section */}
        <Box flexGrow={1}>
          <LoginView />
        </Box>
      </Box>
    </>
  );
}
