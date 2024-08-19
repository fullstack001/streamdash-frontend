import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  loginId,
  mac,
  name,
  comment,
  expiry,
  status,
  handleClick,
  deleteAction,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleDelete = () => {
    deleteAction(loginId);
    setOpen(null);
  };

  // Parse expiry date and get the current date
  const expiryDate = new Date(expiry);
  const currentDate = new Date();
  const isBeforeExpiry = currentDate > expiryDate;

  return (
    <>
      <TableRow hover tabIndex={-1} name="checkbox" selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        <TableCell component="th" scope="row">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {loginId}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{mac}</TableCell>

        <TableCell>{name}</TableCell>

        <TableCell align="center">{comment}</TableCell>
        <TableCell align="center">{expiry}</TableCell>

        <TableCell>
          <Label color={(status === 'INACTIVE' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        {isBeforeExpiry && (
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        )}
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  mac: PropTypes.any,
  handleClick: PropTypes.func,
  comment: PropTypes.any,
  expiry: PropTypes.any,
  loginId: PropTypes.any,
  name: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  deleteAction: PropTypes.string,
};
