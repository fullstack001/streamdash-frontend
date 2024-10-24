import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableToolbar({ filterUser, onfilterUser, addUser }) {
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
      }}
    >
      {/* Search Input */}
      <OutlinedInput
        value={filterUser}
        onChange={onfilterUser}
        placeholder="Search Name..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: 'text.disabled', width: 20, height: 20 }}
            />
          </InputAdornment>
        }
        sx={{ width: 240 }} // Optional: Adjust width of the search input
      />

      {/* New User Button */}
      <Button
        variant="contained"
        startIcon={<Iconify icon="eva:plus-fill" />} // Icon for the button
        onClick={addUser} // Trigger the addUser function when clicked
        sx={{
          backgroundColor: '#007b00', // Custom background color
          '&:hover': {
            backgroundColor: '#005600', // Hover color
          },
        }}
      >
        New User
      </Button>
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  filterUser: PropTypes.string,
  onfilterUser: PropTypes.func,
  addUser: PropTypes.func, // Prop for handling adding a new user
};
