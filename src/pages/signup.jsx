import { Helmet } from 'react-helmet-async';

import { Box } from '@mui/material';

import Logo from 'src/components/logo';
import IndexSideBar from 'src/components/indexSidebar';

import { SignupView } from 'src/sections/signup';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Signup | Streamdash – Stream TV Better </title>
      </Helmet>

      <Logo margin={3} />

      {/* Flex container to align Sidebar and LoginView side by side */}
      <Box
        sx={{
          paddingTop: '50px',
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
          <IndexSideBar />
        </Box>

        {/* Login View Section */}
        <Box flexGrow={1}>
          <SignupView />
        </Box>
      </Box>
    </>
  );
}
