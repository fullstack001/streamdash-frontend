import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableToolbar({ filterMac, onFilterMac }) {
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
      }}
    >
      <OutlinedInput
        value={filterMac}
        onChange={onFilterMac}
        placeholder="Search mac..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: 'text.disabled', width: 20, height: 20 }}
            />
          </InputAdornment>
        }
      />

      <Tooltip title="Filter list">
        <IconButton>
          <Iconify icon="ic:round-filter-list" />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  filterMac: PropTypes.string,
  onFilterMac: PropTypes.func,
};
