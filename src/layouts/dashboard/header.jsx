import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useAuth } from 'src/hooks/use-auth';
import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';
import { useLocationStore } from 'src/store/locationStore';

import Iconify from 'src/components/iconify';

// import Searchbar from './common/searchbar';
import { NAV, HEADER } from './config-layout';
import AccountPopover from './common/account-popover';
// import LanguagePopover from './common/language-popover';
// import NotificationsPopover from './common/notifications-popover';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const { country } = useLocationStore();
  const user = useAuth();
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');

  // Add this function to get country info
  const getCountryInfo = () => {
    console.log(country);
    if (!country) return { flagUrl: '/assets/images/world-flag.png', currency: 'US $ (USD)' };

    if (country === 'canada')
      return { flagUrl: '/assets/images/canada-flag.png', currency: 'Canadian $ (CAD)' };
    if (country === 'USA' || country === 'united states')
      return { flagUrl: '/assets/images/us-flag.png', currency: 'US $ (USD)' };
    return { flagUrl: '/assets/images/world-flag.png', currency: 'US $ (USD)' };
  };

  const { flagUrl, currency } = getCountryInfo();

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      {/* <Searchbar /> */}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        {/* Display the credit value */}
        <Typography variant="body1" sx={{ color: theme.palette.text.primary, mr: 4 }}>
          Credit{user.credit > 1 ? 's' : ''}: {user.credit}
        </Typography>

        {/* Add country flag and currency */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mr: 2,
            border: 'solid 1px #D9D9D9',
            padding: '5px',
            borderRadius: '5px',
          }}
        >
          <img
            src={flagUrl}
            alt="Country flag"
            width={24}
            height={16}
            style={{ marginRight: '8px' }}
          />
          <Typography variant="body2" color={theme.palette.text.secondary}>
            {currency}
          </Typography>
        </Box>

        {/* <LanguagePopover /> */}
        {/* <NotificationsPopover /> */}
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
