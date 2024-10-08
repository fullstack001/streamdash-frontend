import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useAuth } from 'src/hooks/use-auth';

import { account } from 'src/_mock/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  // {
  //   label: 'Home',
  //   icon: <FaHome />,
  //   link: '/',
  // },
  {
    label: 'Profile',
    icon: <FaUser />,
    link: '/profile',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const user = useAuth();
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={account.photoURL}
          alt={account.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {account.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <Link
            to={option.link}
            style={{ marginLeft: 8, textDecoration: 'none', color: 'inherit' }} // Remove underline and set color
          >
            <MenuItem key={option.label} onClick={handleClose}>
              {option.icon}
              {option.label}
            </MenuItem>
          </Link>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleClose}
          sx={{
            typography: 'body2',
            color: 'white',
            py: 1,
            m: 2,
            backgroundColor: 'primary.main', // Changed to blue (primary color)
            '&:hover': {
              backgroundColor: 'error.main', // Changed to red on hover
            },
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Link
            to="/logout"
            style={{
              textDecoration: 'none', // Remove underline
              color: 'inherit', // Make sure color stays consistent with the MenuItem
              width: '100%', // Make the button full width
              textAlign: 'center',
              display: 'block', // Added to ensure full coverage of MenuItem
            }}
          >
            Log out
          </Link>
        </MenuItem>
      </Popover>
    </>
  );
}
