import { Helmet } from 'react-helmet-async';

import { Box } from '@mui/material';

import Logo from 'src/components/logo';
import IndexSideBar from 'src/components/indexSidebar';

import { ResetPasswordView } from 'src/sections/reset-password';

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  return (
    <>
      <Helmet>
        <title> ResetPassword |Streamdash – Stream TV Better </title>
      </Helmet>
      <Logo margin={3} />
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
          <ResetPasswordView />
        </Box>
      </Box>
    </>
  );
}
